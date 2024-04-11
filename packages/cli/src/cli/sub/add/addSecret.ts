import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { spawnSync } from 'node:child_process'

export const addSecret = async (key: string) => {
  try {
    const config = await readOrCreateConfig()
    if (!config.app.projectId) {
      throw new Error('Project ID not found')
    }
    const cmd = [
      'firebase',
      'functions:secrets:set',
      key,
      '--project',
      config.app.projectId,
    ]
    spawnSync(cmd[0], cmd.slice(1), { stdio: 'inherit', shell: true })
    return
  } catch (error) {
    throw new Error(`addSecret: ${error}`)
  }
}
