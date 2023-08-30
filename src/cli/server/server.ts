import { execSync, spawn } from 'child_process'
import { existsSync } from 'fs'
import { ServerOptions } from '.'

export const server = async (options: ServerOptions) => {
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
            spawn(shCmd[0], shCmd.slice(1), { stdio: 'ignore' })
          } catch (error) {
            // エラーログを出力
            console.error(`Error killing process with pid: ${line}`, error)
          }
        }
      }
    }

    mkidrTmpDir()

    let cmd = []
    if (options.backend) {
      cmd = ['yarn', 'skeet:graphql', '&&', 'yarn skeet:dev']
    } else if (options.functions) {
      cmd = ['yarn', 'skeet:dev']
    } else if (options.web) {
      cmd = ['yarn', 'dev']
    } else if (options.graphql) {
      cmd = ['yarn', 'skeet:graphql']
    } else {
      cmd = ['yarn', 'skeet']
    }

    const childProcess = spawn(cmd[0], cmd.slice(1), {
      stdio: 'inherit',
      shell: true,
    })

    // シグナルハンドリング
    process.on('SIGINT', function () {
      console.log('\nGracefully shutting down from SIGINT (Ctrl+C)')
      childProcess.kill('SIGINT') // 子プロセスも終了させる
      process.exit()
    })
  } catch (error) {
    console.error('Error in server function:', error)
  }
}

const mkidrTmpDir = () => {
  if (existsSync('tmp/data')) return
  const cmd = `mkdir -p tmp/data && mkdir -p tmp/ai && chmod -R 777 tmp`
  execSync(cmd)
}
