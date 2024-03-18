import { execAsyncCmd } from '@/lib/execAsyncCmd'

export const getSecret = (secretKey: string) => {
  try {
    const cmd = ['firebase', 'functions:secrets:access', secretKey]
    execAsyncCmd(cmd)
  } catch (error) {
    throw new Error(`getSecret: ${error}`)
  }
}
