import { spawnSync } from 'child_process'

export const dockerRun = async () => {
  const cmd = `pnpm docker:run`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
