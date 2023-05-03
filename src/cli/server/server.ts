import { execCmd } from '@/lib/execCmd'
import { execSync, spawnSync } from 'child_process'

export const server = async () => {
  try {
    const cmd = "ps aux | grep '127.0.0.1' | awk '{print $2}'"
    const pid = execSync(cmd)
    const pidId = String(pid).trim()

    if (pidId !== '' && pidId !== 'undefined') {
      console.log(pidId)
      for await (const line of pidId.split('\n')) {
        try {
          const shCmd = ['kill', '-9', line]
          spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'ignore' })
        } catch (error) {
          //console.log(error)
        }
      }
    }
    const skeetS = ['yarn', 'skeet']
    await execCmd(skeetS)
  } catch (error) {
    console.log(error)
  }
}
