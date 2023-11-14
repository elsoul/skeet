import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import { existsSync, mkdirSync } from 'fs'

export const helloCommand = () => {
  const fileDir = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/lib/discord/commands`
  if (!existsSync(fileDir)) {
    mkdirSync(fileDir, { recursive: true })
  }
  const filePath = `${fileDir}/hello.ts`
  const body = `import { SlashCommandBuilder } from '@skeet-framework/discord-utils'

export const data = new SlashCommandBuilder()
  .setName('hello')
  .setDescription('Hello Slash Command')
  .addStringOption((option) =>
    option.setName('hey').setDescription('Say something').setRequired(true),
  )
`
  return {
    filePath,
    body,
  }
}
