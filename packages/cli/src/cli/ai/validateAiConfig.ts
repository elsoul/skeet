import { SKEET_CONFIG_PATH } from '@/index'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import { readFile, writeFile } from 'fs/promises'

const defaultAiConfig = {
  lang: 'en',
  ais: [
    {
      name: 'Gemini',
      availableModels: ['gemini-1.0-pro', 'gemini-1.0-pro-vision'],
    },
  ],
}

export const validateAiConfig = async () => {
  try {
    const config = await readFile(`./skeet-cloud.config.json`)
    const skeetConfig: SkeetCloudConfig = JSON.parse(String(config))
    if (!skeetConfig.ai) {
      skeetConfig.ai = defaultAiConfig
      await writeFile(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
    }
  } catch (error) {
    const skeetConfig = {
      ai: defaultAiConfig,
    }
    await writeFile(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  }
}
