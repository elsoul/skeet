import chalk from 'chalk'
import { promptUser } from '../ai'
import { chat } from '@skeet-framework/ai'
import inquirer from 'inquirer'
import { yesOrNo } from './yesOrNoMode'
import { AiLog } from '../aiLog'
import { SkeetAIOptions } from '..'
import { getSQLs } from '@/lib/files/getSQLs'
import { prismaPrompt } from '../skeetai/prisma/prompt'
import { appendFile } from 'fs/promises'
import { execAsync } from '@skeet-framework/utils'

type PrismaOptions = {
  modelPath: string
  input: string
}

export const prismaMode = async (config: SkeetAIOptions, logger: AiLog) => {
  const log = logger.text() as SkeetLog
  console.log(chalk.cyan(log.prismaMode.init))
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

  const answer = await inquirer.prompt<PrismaOptions>([
    {
      type: 'list',
      name: 'modelPath',
      message: 'Select Model',
      choices: await getSQLs(),
    },
    {
      type: 'input',
      name: 'input',
      message: inputMessage,
    },
  ])
  const prismaSchemaPath = './sql/' + answer.modelPath + '/prisma/schema.prisma'
  const firstAiContent = await prismaPrompt(prismaSchemaPath)
  const prismaSchema = (await chat(
    firstAiContent.context,
    firstAiContent.examples,
    answer.input,
    config.ai,
    false,
  )) as string
  console.log(
    chalk.blue(
      'Skeet: ' +
        chalk.white(log.common.howAboutThis) +
        chalk.gray(log.prismaMode.warning),
    ) +
      chalk.white('```prisma.schema\n') +
      chalk.white(prismaSchema) +
      `${chalk.white('\n```')}`,
  )

  const text = String(log.prismaMode.schemaConfirm)
  const isYes = await yesOrNo(text)
  if (!isYes) {
    await prismaMode(config, logger)
    return
  }

  await appendFile(prismaSchemaPath, prismaSchema)
  console.log(chalk.white(`\nUpdated: ${prismaSchemaPath}`))
  console.log(
    chalk.white(log.common.thenRun),
    chalk.green(`$ skeet db migrate -d ${answer.modelPath}`),
  )
  const migrateText = String(log.prismaMode.migrationConfirm)
  const runMigrate = await yesOrNo(migrateText)
  if (runMigrate) {
    await execAsync(`skeet db migrate -d ${answer.modelPath}`)
    console.log(
      chalk.white(log.common.thenRun),
      chalk.green(`$ skeet g scaffold -d ${answer.modelPath}`),
    )

    const scaffoldText = String(log.prismaMode.scaffoldConfirm)

    const runScaffold = await yesOrNo(scaffoldText)
    if (runScaffold) {
      await execAsync(`skeet g scaffold -d ${answer.modelPath}`)
    }
  }

  console.log(chalk.white(log.prismaMode.ExitingMode + '...\n'))
  await promptUser(config, logger)
  return
}
