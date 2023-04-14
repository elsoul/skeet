import { execCmd } from '@/lib/execCmd'
import { execSyncCmd } from '@/lib/execSyncCmd'
import { exec, execSync, spawnSync } from 'child_process'

export const server = async () => {
  try {
    const cmd =
      "ps aux | awk '!/grep/ && /cloud-firestore-emulator.*host 127.0.0.1/ {print $2}'"
    const pid = execSync(cmd)
    const pidId = String(pid).trim()

    if (pidId !== '' && pidId !== 'undefined') {
      const shCmd = ['kill', '-9', pidId]
      spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'ignore' })
    }
    const skeetS = ['yarn', 'skeet']
    await execCmd(skeetS)
  } catch (error) {
    console.log(error)
  }
}
