import {
  BACKEND_GRAPHQL_REPO_URL,
  SKEET_CONFIG_PATH,
  importConfig,
} from '@/lib'
import { deployCommands } from '@/templates/discord/deployCommands'
import { helloAction } from '@/templates/discord/helloAction'
import { helloCommand } from '@/templates/discord/helloCommand'
import { helloIndex } from '@/templates/discord/helloIndex'
import { helloMessage } from '@/templates/discord/helloMessage'
import chalk from 'chalk'
import { existsSync, writeFileSync } from 'fs'

export const addDiscordCmd = () => {
  try {
    let { body, filePath } = helloAction()
    if (existsSync(filePath)) {
      console.log(chalk.yellow(`⚠️ discordRouter already exists`))
      console.log(chalk.white(`🔗 ${filePath}`))
      return false
    }
    writeFileSync(filePath, body)
    console.log(chalk.green(`✅ helloAction added 🎉`))
    console.log(chalk.white(`🔗 ${filePath}`))
    ;({ body, filePath } = helloCommand())
    writeFileSync(filePath, body)
    console.log(chalk.green(`✅ helloCommand added 🎉`))
    console.log(chalk.white(`🔗 ${filePath}`))
    ;({ body, filePath } = helloIndex())
    writeFileSync(filePath, body)
    console.log(chalk.green(`✅ helloIndex added 🎉`))
    console.log(chalk.white(`🔗 ${filePath}`))
    ;({ body, filePath } = deployCommands())
    writeFileSync(filePath, body)
    console.log(chalk.green(`✅ deployCommands added 🎉`))
    console.log(chalk.white(`🔗 ${filePath}`))
    ;({ body, filePath } = helloMessage())
    writeFileSync(filePath, body)
    console.log(chalk.green(`✅ helloMessage added 🎉`))
    console.log(chalk.white(`🔗 ${filePath}`))
    return true
  } catch (error) {
    throw new Error(`addBackendSetup: ${error}`)
  }
}
