import { spawnSync } from 'child_process'

export const dockerRm = async () => {
  const cmd = `yarn docker:rm`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
