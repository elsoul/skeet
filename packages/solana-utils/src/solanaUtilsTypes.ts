import { PublicKey } from '@solana/web3.js'
/**
 * Parameters representing a stake reward.
 */
export type StakeRewardParams = {
  /**
   * The epoch in which the reward occurred.
   */
  epoch: number

  /**
   * The effective slot at the time of the reward.
   */
  effectiveSlot: number

  /**
   * The amount of the reward.
   */
  amount: number

  /**
   * The post-reward balance of the stake account.
   */
  postBalance: number

  /**
   * The commission taken by the validator (optional).
   */
  commission?: number | null | undefined

  /**
   * The address of the stake account.
   */
  stakeAccountAddress: string
}

/**
 * Represents the status information of a validator on the Solana network.
 */
export type ValidatorStatusParams = {
  /**
   * The public key of the validator's vote account.
   */
  pubkey: string

  /**
   * Indicates whether the validator is currently active.
   */
  isActive: boolean

  /**
   * Describes the reason for the validator's current status.
   */
  reason: string
}

export type Creator = {
  /**
   * The wallet address of the creator.
   */
  address: string

  /**
   * The share percentage of the creator in the NFT's revenue.
   */
  share: number
}

export type File = {
  /**
   * The URI of the file associated with the NFT.
   */
  uri: string

  /**
   * The type of file (e.g., image, video).
   */
  type: string
}

export type Properties = {
  /**
   * A list of creators associated with the NFT.
   */
  creators: Creator[]

  /**
   * A list of files associated with the NFT.
   */
  files: File[]
}

export type Attribute = {
  /**
   * The type of trait this attribute represents (e.g., color, size).
   */
  trait_type: string

  /**
   * The value of the attribute, which can be a string or number.
   */
  value: string | number
}

/**
 * Represents the metadata associated with a Non-Fungible Token (NFT).
 */
export type NftMetadata = {
  /**
   * The name of the NFT.
   */
  name: string

  /**
   * The symbol representing the NFT.
   */
  symbol: string

  /**
   * A description of the NFT.
   */
  description: string

  /**
   * The seller fee in basis points (100 basis points = 1%).
   */
  seller_fee_basis_points: number

  /**
   * A URI to the main image of the NFT.
   */
  image: string

  /**
   * An external URL for more information about the NFT.
   */
  external_url: string

  /**
   * A list of attributes that define the characteristics of the NFT.
   */
  attributes: Attribute[]

  /**
   * Properties of the NFT including creators and files.
   */
  properties: Properties

  /**
   * The category of the NFT (e.g., art, collectible).
   */
  category: string
}

/**
 * Represents the metadata associated with a Solana Stake Program account.
 */
export type ParsedStakeAccount = {
  info: StakeInfo
  type: string
}

export type StakeInfo = {
  meta: StakeMeta
  stake: StakeDetails
}

export type StakeMeta = {
  authorized: StakeAuthorized
  lockup: StakeLockup
  rentExemptReserve: string
}

export type StakeAuthorized = {
  staker: string
  withdrawer: string
}

export type StakeLockup = {
  custodian: string
  epoch: number
  unixTimestamp: number
}

export type StakeDetails = {
  creditsObserved: number
  delegation: StakeDelegation
}

export type StakeDelegation = {
  activationEpoch: string
  deactivationEpoch: string
  stake: string
  voter: string
  warmupCooldownRate: number
}

export type RewardDataResponse = {
  epoch: number
  pubkey: string
  totalRewardAmount: number
  totalBalance: number
  rewards: StakeRewardParams[]
}

export type TokenTransferInfo = {
  amount: string
  authority: string
  destination: string
  source: string
}

export type ParsedInstruction = {
  parsed: {
    info: TokenTransferInfo
    type: string
  }
  program: string
  programId: PublicKey
  stackHeight: number
}

export type InnerInstruction = {
  index: number
  instructions: ParsedInstruction[]
}

export type UiTokenAmount = {
  amount: string
  decimals: number
  uiAmount: number
  uiAmountString: string
}

export type PostOrPreTokenBalance = {
  accountIndex: number
  mint: string
  owner: string
  programId: string
  uiTokenAmount: UiTokenAmount
}

export type TransactionMeta = {
  computeUnitsConsumed: number
  err: null | any // 'any' can be replaced with a more specific error type if available
  fee: number
  innerInstructions: InnerInstruction[]
  logMessages: string[]
  postBalances: number[]
  postTokenBalances: PostOrPreTokenBalance[]
  preBalances: number[]
  preTokenBalances: PostOrPreTokenBalance[]
  rewards: any[] // 'any' can be replaced with a more specific reward type if available
  status: { Ok: null } | any // 'any' can be replaced with a more specific status type if available
  loadedAddresses: any // 'any' can be replaced with a more specific type if available
}

export type TransactionMessage = {
  accountKeys: {
    pubkey: PublicKey
    signer: boolean
    source: string
    writable: boolean
  }[]
  instructions: any[] // Replace 'any' with a more specific instruction type if available
  recentBlockhash: string
  addressTableLookups: any // Replace 'any' with a more specific type if available
}

export type SolanaTransaction = {
  blockTime: number
  meta: TransactionMeta
  slot: number
  transaction: {
    message: TransactionMessage
    signatures: string[]
  }
  version: any // Replace 'any' with a more specific version type if available
}

export type TokenExchange = {
  owner: string
  direction: 'buy' | 'sell'
  token1: string
  token1Amount: number
  token2: string
  token2Amount: number
}

export type SPLTransferHistoryResponse = {
  blockTime: number
  confirmationStatus: string
  err: null | any
  memo: null | string
  signature: string
  slot: number
}

export type SolTransferDetailsResponse = {
  destination: string
  lamports: number
  source: string
}
