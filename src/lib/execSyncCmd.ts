import { spawnSync } from 'child_process'

export const execSyncCmd = async (
  command: Array<string>,
  cwd: string = '.'
) => {
  spawnSync(command[0], command.slice(1), {
    cwd,
    stdio: 'inherit',
  })
}
