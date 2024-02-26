import { RewardDataResponse } from '@/solanaUtilsTypes'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { getLastStakingReward } from './getLastStakingReward'
import { getStakeAccounts } from './getStakeAccounts'
/**
 * Retrieves all staking rewards for a given public key.
 *
 * @param {string} endpoint - The Solana network endpoint to connect to.
 * @param {string} pubkey - The public key of the account for which to retrieve staking rewards.
 * @returns {Promise<RewardDataResponse>} - A promise that resolves to a RewardDataResponse object containing the total reward amount, total balance, and individual rewards for each stake account.
 * @throws {Error} - Throws an error if unable to fetch the stake accounts or rewards.
 *
 * @example
 * ```
 * const endpoint = 'https://api.mainnet-beta.solana.com';
 * const publicKey = 'YourPublicKeyHere';
 *
 * try {
 *   const rewardData = await getAllStakeRewardsByPubkey(endpoint, publicKey);
 *   console.log('Stake rewards data:', rewardData);
 * } catch (error) {
 *   console.error('Error fetching stake rewards:', error);
 * }
 * ```
 */
export const getAllStakeRewardsByPubkey = async (
  endpoint: string,
  pubkey: string,
) => {
  const result = await getStakeAccounts(pubkey, endpoint)
  const stakeAccounts = result.map((account) => account.publicKey)
  const rewards = []
  let totalRewardAmount = 0
  let totalBalance = 0
  for await (const account of stakeAccounts) {
    const reward = await getLastStakingReward(endpoint, account)
    if (!reward) continue
    rewards.push(reward)
    totalRewardAmount += reward.amount / LAMPORTS_PER_SOL
    totalBalance += reward.postBalance / LAMPORTS_PER_SOL
  }
  const rewardData = {
    epoch: rewards[0].epoch,
    pubkey,
    totalRewardAmount,
    totalBalance,
    rewards,
  }
  return rewardData as RewardDataResponse
}
