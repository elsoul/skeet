import { execCmd } from '@/lib/execCmd'
import { exec } from 'child_process'

export const server = async () => {
  try {
    const pid = exec(
      "ps aux | grep 'cloud-firestore-emulator.*host 127.0.0.1' | awk '{print $2}'",
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return
        }
        return stdout
      }
    )
    exec(`kill -9 ${pid}`)
    const shCmd = ['yarn', 'skeet']
    await execCmd(shCmd)
  } catch (error) {
    console.log(error)
  }
}
