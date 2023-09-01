import { PRISMA_SCHEMA_PATH } from '@/index'
import { SkeetAI } from '@skeet-framework/ai'
import chalk from 'chalk'
import * as readline from 'readline'
import { promptUser } from '../ai'
import { yesOrNoMode } from './yesOrNoMode'
import { spawnSync } from 'child_process'
import { NamingEnum } from '@skeet-framework/ai'

export const prismaMode = async (skeetAi: SkeetAI, rl: readline.Interface) => {
  console.log(chalk.cyan('🤖 Prisma Scheme Generating Mode 🤖'))
  console.log(chalk.white(`Please describe your Database use case.`))
  rl?.question(chalk.green('\nYou: '), async (prismaInput: string) => {
    const prismaSchema = (await skeetAi.prisma(prismaInput)) as string
    console.log(
      chalk.blue(
        'Skeet:' +
          chalk.white(' How about this one?\n\n') +
          chalk.gray(
            '(Showing only the new parts of the models. prisma format (also there is vscode plugin) will add the relations automatically to the existing models.)\n\n'
          )
      ) +
        `${chalk.white('```prisma.schema\n')}` +
        chalk.white(prismaSchema) +
        `${chalk.white('\n```')}`
    )
    const text = '\n❓ Is this schema good for you? (Yes/No) '
    const isYes = (await yesOrNoMode(rl, text)) as boolean
    if (!isYes) {
      prismaMode(skeetAi, rl)
      return
    }
    const migrationName = await skeetAi.naming(
      prismaSchema,
      NamingEnum.MIGRATION
    )
    console.log(chalk.white(`\nEdit: ${PRISMA_SCHEMA_PATH}`))
    console.log(
      chalk.white(`\nThen run:`),
      chalk.green(`$ skeet db migrate ${migrationName}`)
    )
    const migrateText =
      '\n❓ Do you want me to run the migration now? (Yes/No) '
    const runMigrate = (await yesOrNoMode(rl, migrateText)) as boolean
    if (runMigrate) {
      spawnSync(`skeet db migrate ${migrationName}`, {
        stdio: 'inherit',
        shell: true,
      })

      console.log(chalk.white(`\nThen run:`), chalk.green(`$ skeet g scaffold`))

      const scaffoldText = '\n❓ Do you want me to run scaffold now? (Yes/No) '
      const runScaffold = (await yesOrNoMode(rl, scaffoldText)) as boolean
      if (runScaffold) {
        spawnSync(`skeet g scaffold`, {
          stdio: 'inherit',
          shell: true,
        })
      }
    }
    promptUser(skeetAi.initOptions)
  })
  return
}
