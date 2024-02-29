import { PRISMA_SCHEMA_PATH } from '@/index'
import chalk from 'chalk'
import { promptUser } from '../ai'
import { spawnSync } from 'child_process'
import { NamingEnum } from '@skeet-framework/ai'
import { SkeetAiMode, SkeetRole } from '@/types/skeetTypes'
import inquirer from 'inquirer'
import { yesOrNo } from './yesOrNoMode'
import { AiLog } from '../aiLog'
import { SkeetAIOptions } from '..'

export const prismaMode = async (config: SkeetAIOptions, logger: AiLog) => {
  const log = logger.text() as SkeetLog
  console.log(chalk.cyan(log.prismaMode.init))
  const model = String(config.model)
  const inputMessage =
    log.prismaMode.modeDesc +
    '\n\n' +
    log.common.example +
    log.prismaMode.example1 +
    '\n\nor\n\n' +
    log.common.example +
    log.prismaMode.example2 +
    '\n\n' +
    chalk.green(log.common.you + ':')
  logger.addJson(SkeetRole.AI, inputMessage, SkeetAiMode.Firestore, model)
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'input',
      message: inputMessage,
    },
  ])

  const prismaSchema = (await skeetAi.prisma(answer.input)) as string
  console.log(
    chalk.blue(
      'Skeet: ' +
        chalk.white(log.common.howAboutThis) +
        chalk.gray(log.prismaMode.warning),
    ) +
      `${chalk.white('```prisma.schema\n')}` +
      chalk.white(prismaSchema) +
      `${chalk.white('\n```')}`,
  )

  const text = String(log.prismaMode.schemaConfirm)
  const isYes = await yesOrNo(text)
  if (!isYes) {
    logger.addJson(SkeetRole.USER, 'No', SkeetAiMode.Prisma, model)
    prismaMode(config, logger)
    return
  }
  logger.addJson(SkeetRole.USER, 'Yes', SkeetAiMode.Prisma, model)
  const migrationName = await skeetAi.naming(prismaSchema, NamingEnum.MIGRATION)
  console.log(chalk.white(`\nEdit: ${PRISMA_SCHEMA_PATH}`))
  console.log(
    chalk.white(log.common.thenRun),
    chalk.green(`$ skeet db migrate ${migrationName}`),
  )
  const migrateText = String(log.prismaMode.migrationConfirm)
  const runMigrate = await yesOrNo(migrateText)
  if (runMigrate) {
    spawnSync(`skeet db migrate ${migrationName}`, {
      stdio: 'inherit',
      shell: true,
    })
    logger.addJson(SkeetRole.USER, 'Yes', SkeetAiMode.Prisma, model)
    console.log(
      chalk.white(log.common.thenRun),
      chalk.green(`$ skeet g scaffold`),
    )

    const scaffoldText = String(log.prismaMode.scaffoldConfirm)
    logger.addJson(SkeetRole.AI, scaffoldText, SkeetAiMode.Prisma, model)
    const runScaffold = await yesOrNo(scaffoldText)
    if (runScaffold) {
      spawnSync(`skeet g scaffold`, {
        stdio: 'inherit',
        shell: true,
      })
    }
  }

  console.log(chalk.white(log.prismaMode.ExitingMode + '...\n'))
  promptUser(config, logger)
  return
}
