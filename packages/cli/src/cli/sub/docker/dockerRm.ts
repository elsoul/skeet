import { spawnSync } from 'node:child_process'

export const dockerRm = async () => {
  const cmd = `pnpm docker:rm`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
