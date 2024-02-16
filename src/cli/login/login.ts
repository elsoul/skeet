import dotenv from 'dotenv'
import { spawnSync } from 'child_process'
import { DEFAULT_FUNCTION_NAME } from '@/index'
dotenv.config()

export const login = async () => {
  try {
    const cmd = [`pnpm`, `-F`, `${DEFAULT_FUNCTION_NAME}-func`, `fb:login`]
    spawnSync(cmd[0], cmd.slice(1), { stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`login: ${error}`)
  }
}
