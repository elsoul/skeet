import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import { discordRouter } from '@/templates/discord/discordRouter'
import chalk from 'chalk'
import { existsSync, writeFileSync } from 'fs'
import { insertFunction } from './addMethod'
import { helloAction } from '@/templates/discord/helloAction'
import { helloCommand } from '@/templates/discord/helloCommand'
import { helloIndex } from '@/templates/discord/helloIndex'
import { helloMessage } from '@/templates/discord/helloMessage'
import { deployCommands } from '@/templates/discord/deployCommands'

export const addDiscordWebhook = () => {
  try {
    let { body, filePath } = discordRouter()
    if (existsSync(filePath)) {
      return false
    }
    writeFileSync(filePath, body)
    ;({ body, filePath } = helloAction())
    writeFileSync(filePath, body)
    ;({ body, filePath } = helloCommand())
    writeFileSync(filePath, body)
    ;({ body, filePath } = helloIndex())
    writeFileSync(filePath, body)
    ;({ body, filePath } = deployCommands())
    writeFileSync(filePath, body)
    ;({ body, filePath } = helloMessage())
    writeFileSync(filePath, body)

    console.log(chalk.green(`✅ discordRouter added 🎉`))
    console.log(chalk.green(`✅ helloAction added 🎉`))
    console.log(chalk.green(`✅ helloCommand added 🎉`))
    console.log(chalk.green(`✅ helloIndex added 🎉`))
    console.log(chalk.green(`✅ deployCommands added 🎉`))
    console.log(chalk.green(`✅ helloMessage added 🎉`))
    const indexFile = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/index.ts`
    const methodName = 'discordRouter'
    insertFunction(indexFile, methodName)
    return true
  } catch (error) {
    throw new Error(`addDiscordWebhook: ${error}`)
  }
}
