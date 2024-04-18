import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { mkdir } from 'fs/promises'

export const deployCommands = async () => {
  const fileDir = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}-func/src/lib/discord`
  if (!(await checkFileDirExists(fileDir))) {
    await mkdir(fileDir, { recursive: true })
  }
  const filePath = `${fileDir}/deploy-commands.ts`
  const body = `import { commands } from './commands'
import { deployCommands } from '@skeet-framework/discord-utils'
import { DISCORD_APPLICATION_ID, DISCORD_GUILD_ID } from '../config'
import { execSync } from 'child_process'

const commandsData = Object.values(commands).map((command) => command.data)

const run = async () => {
  const cmd = 'skeet get secret DISCORD_TOKEN'
  const token = String(execSync(cmd)).trim()
  await deployCommands(
    token,
    DISCORD_APPLICATION_ID,
    DISCORD_GUILD_ID,
    commandsData,
  )
}

run()`
  return {
    filePath,
    body,
  }
}
