import { spawn } from 'child_process'

export const execCmd = async (command: Array<string>, cwd: string = '.') => {
  let p = spawn(command[0], command.slice(1), { cwd })
  return new Promise((resolveFunc) => {
    p.stdout.on('data', (x) => {
      process.stdout.write(x.toString())
    })
    p.stderr.on('data', (x) => {
      process.stderr.write(x.toString())
    })
    p.on('exit', (code) => {
      resolveFunc(code)
    })
  })
}
