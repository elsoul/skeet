import { existsAsync } from '@skeet-framework/utils'
import { readFile, writeFile } from 'fs/promises'
import { SkeetCloudConfig, defaultSkeetCloudConfig } from './skeetCloud'

export const readOrCreateConfig = async () => {
  const configFile = 'skeet-cloud.config.json'
  if (await existsAsync(configFile)) {
    const skeetConfig = JSON.parse(
      await readFile(configFile, 'utf-8'),
    ) as SkeetCloudConfig
    return skeetConfig
  }
  const skeetConfig = defaultSkeetCloudConfig
  await writeFile(configFile, JSON.stringify(skeetConfig, null, 2))
  return skeetConfig
}
