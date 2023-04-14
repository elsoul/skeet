import { execCmd } from '@/lib/execCmd'
import { execSyncCmd } from '@/lib/execSyncCmd'
import { exec, execSync } from 'child_process'

export const server = async () => {
  try {
    const cmd =
      "ps aux | awk '!/grep/ && /cloud-firestore-emulator.*host 127.0.0.1/ {print $2}'"
    const pid = execSync(cmd)
    console.log(String(pid))
    const shCmd = ['kill', '-9', String(pid).trim()]
    await execCmd(shCmd)
    const skeetS = ['yarn', 'skeet']
    await execCmd(skeetS)
  } catch (error) {
    console.log(error)
  }
}
