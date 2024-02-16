import { SKEET_CONFIG_PATH, execSyncCmd, importConfig } from '@/lib'
import { AI } from '@/types/skeetTypes'
import { writeFileSync } from 'fs'

export const addSecret = async (key: string) => {
  try {
    const cmd = ['firebase', 'functions:secrets:set', key]
    execSyncCmd(cmd)
    return await addAiConfig(key)
  } catch (error) {
    throw new Error(`addSecret: ${error}`)
  }
}

const addAiConfig = async (key: string) => {
  const skeetConfig = importConfig()
  if (key === 'CHAT_GPT_KEY') {
    skeetConfig.ai.ais.push({
      name: 'OpenAI',
      availableModels: ['gpt-3.5-turbo', 'gpt-4'],
    } as AI)
    writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  }
  return true
}
