import { spawnSync } from 'child_process'

export const dockerBuild = async () => {
  const cmd = `yarn docker:build`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
