import { execSync } from 'node:child_process'
import { importConfig, getContainerRegion } from '@/lib'
import { SkeetCloudConfig } from '@/types/skeetTypes'

export const dockerLogin = async () => {
  try {
    const config: SkeetCloudConfig = await importConfig()
    const region = config.app.region
    const cRegion = getContainerRegion(region)
    const shCmd = `cat ./keyfile.json | docker login -u _json_key --password-stdin https://${cRegion}`
    execSync(shCmd)
  } catch (error) {
    throw new Error(
      `docker login failed: ${error}\n$ skeet iam pull\nto get a new keyfile.json`,
    )
  }
}
