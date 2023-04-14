import { execCmd } from '@/lib/execCmd'
import { spawnSync } from 'child_process'

export const server = async () => {
  try {
    const killEmulator =
      "kill $(ps aux | grep 'cloud-firestore-emulator.*host 127.0.0.1' | awk '{print $2}')"

    spawnSync(killEmulator, { stdio: 'ignore' })
    const shCmd = ['yarn', 'skeet']
    await execCmd(shCmd)
  } catch (error) {
    const shCmd = ['yarn', 'skeet']
    await execCmd(shCmd)
  }
}
