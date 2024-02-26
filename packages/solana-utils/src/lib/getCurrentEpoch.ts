import { Connection } from '@solana/web3.js'

export const getCurrentEpoch = async (endpoint: string) => {
  try {
    const connection = new Connection(endpoint)
    const currentEpoch = await connection
      .getEpochInfo()
      .then((info) => info.epoch)
    return currentEpoch
  } catch (error) {
    throw new Error(`getCurrentEpoch: ${error}`)
  }
}
