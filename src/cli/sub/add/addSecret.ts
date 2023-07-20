import { execSyncCmd } from '@/lib/execSyncCmd'

export const addSecret = async (key: string) => {
  try {
    const cmd = ['firebase', 'functions:secrets:set', key]
    execSyncCmd(cmd)
  } catch (error) {
    throw new Error(`addSecret: ${error}`)
  }
}
