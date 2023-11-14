import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import { discordRouter } from '@/templates/discord/discordRouter'
import chalk from 'chalk'
import { existsSync, writeFileSync } from 'fs'
import { insertFunction } from './addMethod'

export const addDiscordWebhook = () => {
  try {
    const { body, filePath } = discordRouter()
    if (existsSync(filePath)) {
      return false
    }
    writeFileSync(filePath, body)
    console.log(chalk.green(`✅ discordRouter added 🎉`))
    console.log(chalk.white(`🔗 ${filePath}`))
    const indexFile = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/index.ts`
    const methodName = 'discordRouter'
    insertFunction(indexFile, methodName)
    return true
  } catch (error) {
    throw new Error(`addBackendSetup: ${error}`)
  }
}
