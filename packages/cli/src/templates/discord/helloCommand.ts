import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { mkdir } from 'fs/promises'

export const helloCommand = async () => {
  const fileDir = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/lib/discord/commands`
  if (!(await checkFileDirExists(fileDir))) {
    await mkdir(fileDir, { recursive: true })
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
