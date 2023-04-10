import { execCmd } from '@/lib/execCmd'
import { Logger } from '@/lib/logger'

export const server = async () => {
  try {
    const shCmd = ['yarn', 'functions:dev']
    await execCmd(shCmd)
  } catch (error) {
    await Logger.error(`error: ${error}`)
    process.exit(1)
  }
}
