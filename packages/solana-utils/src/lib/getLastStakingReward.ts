import { StakeRewardParams } from '../solanaUtilsTypes'
import { Connection, PublicKey } from '@solana/web3.js'
/**
 * Retrieves the last staking reward for a given stake account on the Solana blockchain.
 *
 * @param endpoint - The URL of the Solana RPC endpoint.
 * @param stakeAccountAddress - The public key of the stake account.
 * @returns An object containing the details of the last staking reward, or `null` if no rewards are found.
 *
 * @example
 * ```typescript
 * const endpoint = 'https://api.mainnet-beta.solana.com'
 * const stakeAccountAddress = 'ExampleStakeAccountAddress'
 *
 * const reward = await getLastStakingReward(endpoint, stakeAccountAddress)
 * if (reward) {
 *   console.log(`Last reward: ${JSON.stringify(reward)}`)
 * } else {
 *   console.log('No rewards found.')
 * }
 * ```
 */
export const getLastStakingReward = async (
  endpoint: string,
  stakeAccountAddress: string,
) => {
  try {
    const connection = new Connection(endpoint)
    const currentEpoch = await connection
      .getEpochInfo()
      .then((info) => info.epoch)
    const stakeAccountPublicKey = new PublicKey(stakeAccountAddress)
    const rewards = await connection.getInflationReward(
      [stakeAccountPublicKey],
      currentEpoch - 1,
    )

    if (rewards && rewards.length > 0 && rewards[0]) {
      const response = {
        stakeAccountAddress,
        ...rewards[0],
      }
      return response as StakeRewardParams
    }
    return null
  } catch (error) {
    throw new Error(`getLastStakingReward: ${error}`)
  }
}
