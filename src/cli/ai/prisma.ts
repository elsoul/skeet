import { PRISMA_SCHEMA_PATH } from '@/index'
import { AIType, SkeetAI } from '@skeet-framework/ai'
import chalk from 'chalk'
import { promptUser } from './ai'
import * as readline from 'readline'

export const prismaMode = async (
  rl: readline.Interface,
  ai: AIType,
  skeetAi: SkeetAI
) => {
  console.log(chalk.cyan('🤖 Prisma Scheme Generating Mode 🤖'))
  console.log(chalk.white(`Please describe your Database use case.`))
  rl?.question(chalk.green('\nYou: '), async (prismaInput: string) => {
    const prismaSchema = await skeetAi.prisma(prismaInput)
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
    console.log(chalk.white(`\nEdit: ${PRISMA_SCHEMA_PATH}`))
    console.log(
      chalk.white(`\nThen run:`),
      chalk.green(`$ skeet db migrate <migrationName>`)
    )
    promptUser({
      ai,
    })
  })
}
