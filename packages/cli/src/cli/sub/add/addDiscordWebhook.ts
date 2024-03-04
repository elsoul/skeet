import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import { discordRouter } from '@/templates/discord/discordRouter'
import chalk from 'chalk'
import { writeFile } from 'fs/promises'
import { insertFunction } from './addMethod'
import { helloAction } from '@/templates/discord/helloAction'
import { helloCommand } from '@/templates/discord/helloCommand'
import { helloIndex } from '@/templates/discord/helloIndex'
import { helloMessage } from '@/templates/discord/helloMessage'
import { deployCommands } from '@/templates/discord/deployCommands'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'

export const addDiscordWebhook = async () => {
  try {
    let { body, filePath } = discordRouter()
    if (await checkFileDirExists(filePath)) {
      return false
    }
    await writeFile(filePath, body)
    ;({ body, filePath } = await helloAction())
    await writeFile(filePath, body)
    ;({ body, filePath } = await helloCommand())
    await writeFile(filePath, body)
    ;({ body, filePath } = await helloIndex())
    await writeFile(filePath, body)
    ;({ body, filePath } = await deployCommands())
    await writeFile(filePath, body)
    ;({ body, filePath } = await helloMessage())
    await writeFile(filePath, body)

    console.log(chalk.green(`✅ discordRouter added 🎉`))
    console.log(chalk.green(`✅ helloAction added 🎉`))
    console.log(chalk.green(`✅ helloCommand added 🎉`))
    console.log(chalk.green(`✅ helloIndex added 🎉`))
    console.log(chalk.green(`✅ deployCommands added 🎉`))
    console.log(chalk.green(`✅ helloMessage added 🎉`))
    const indexFile = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/index.ts`
    const methodName = 'discordRouter'
    await insertFunction(indexFile, methodName)
    return true
  } catch (error) {
    throw new Error(`addDiscordWebhook: ${error}`)
  }
}
