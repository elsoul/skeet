import { spawnSync } from 'node:child_process'

export const dockerRun = async () => {
  const cmd = `pnpm docker:run`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
