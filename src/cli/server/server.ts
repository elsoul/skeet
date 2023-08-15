import { execSync, spawnSync } from 'child_process'

export const server = async () => {
  try {
    const ports = [9099, 5001, 8080, 8085, 8000, 9199] // Firebase Emulatorの各ポート番号

    for (const port of ports) {
      const cmd = `lsof -i :${port} | awk 'NR>1 {print $2}'`
      const pid = execSync(cmd)
      const pidId = String(pid).trim()

      if (pidId !== '' && pidId !== 'undefined') {
        for await (const line of pidId.split('\n')) {
          try {
            const shCmd = ['kill', '-9', line]
            spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'ignore' })
          } catch (error) {
            // エラーログを出力
          }
        }
      }
    }

    const skeetS = ['yarn', 'skeet']
    spawnSync(skeetS[0], skeetS.slice(1), {
      stdio: 'inherit',
    })
  } catch (error) {
    console.log(error)
  }
}
