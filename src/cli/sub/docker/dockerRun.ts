import { spawnSync } from 'child_process'

export const dockerRun = async () => {
  const cmd = `yarn docker:run`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
