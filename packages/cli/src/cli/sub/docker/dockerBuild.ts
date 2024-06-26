import { spawnSync } from 'node:child_process'

export const dockerBuild = async () => {
  const cmd = `pnpm docker:build`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
