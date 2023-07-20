import { execSyncCmd } from '@/lib'

export const getSecret = async (secretKey: string) => {
  try {
    const cmd = ['firebase', 'functions:secrets:access', secretKey]
    execSyncCmd(cmd)
  } catch (error) {
    throw new Error(`getSecret: ${error}`)
  }
}
