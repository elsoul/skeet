import chalk from 'chalk'
import { promptUser } from '../ai'
import { yesOrNo } from './yesOrNoMode'
import { FUNCTIONS_PATH, getFilesInDirectory, getFunctionConfig } from '@/lib'
import inquirer from 'inquirer'
import { addStringTop } from '@/lib/files/addStringTop'
import { AiLog } from '../aiLog'
import { SkeetAIOptions } from '..'
import { typescriptMethodPrompt } from '../skeetai/method/prompt'
import { chat } from '@skeet-framework/ai'
import { writeFile } from 'fs/promises'
import { getFunctions } from '@/lib/files/getFunctions'

export const methodMode = async (skeetAi: SkeetAIOptions, logger: AiLog) => {
  try {
    const log = logger.text() as SkeetLog
    console.log(chalk.cyan(log.methodMode.init))

    const functionName = await inquirer.prompt([
      {
        type: 'list',
        name: 'functionName',
        message: log.methodMode.list1,
        choices: await getFunctions(),
      },
    ])
    const inputMessage =
      log.methodMode.modeDesc +
      '\n\n' +
      log.common.example +
      log.methodMode.example1 +
      '\n\n' +
      chalk.green(log.common.you + ':')

    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'input',
        message: inputMessage,
      },
    ])
    const functionConfig = await getFunctionConfig(functionName.functionName)
    const files = await getFilesInDirectory(
      `${FUNCTIONS_PATH}/${functionName.functionName}/src/lib`,
    )
    const tsFiles = files.filter((file) => file.name.replace('.ts', ''))

    const existingFunctions = tsFiles.map((file) => file.name).join(',')

    const methodPrompt = typescriptMethodPrompt(
      functionConfig.tsconfig,
      functionConfig.package,
      functionConfig.prretierrc,
      existingFunctions,
    )
    const aiAnswerRaw = (await chat(
      methodPrompt.context,
      methodPrompt.examples,
      input.input,
      skeetAi.ai,
      false,
    )) as string

    const aiAnswer = aiAnswerRaw
      ?.replaceAll('```\n', '')
      .replaceAll('```', '') as string

    const nameSuggestion = extractFunctionName(aiAnswer)

    const skeetRes =
      'Skeet:' +
      chalk.white(` ${log.common.howAboutThis}\n`) +
      `${chalk.white(`\`\`\`${nameSuggestion}.ts\n`)}` +
      chalk.white(aiAnswer) +
      `${chalk.white('\n```')}`
    console.log(chalk.blue(skeetRes))
    const newFilePath = `${FUNCTIONS_PATH}/${functionName.functionName}/src/lib/${nameSuggestion}.ts`
    const text = ` ${log.common.MayICreateFile}: \n ${newFilePath}`
    const isYes = await yesOrNo(text)
    if (!isYes) {
      await methodMode(skeetAi, logger)
      return
    }
    await writeFile(newFilePath, aiAnswer)

    const typedocText = ` ${log.common.MayIAddDoc}`
    const isYesDoc = await yesOrNo(typedocText)
    if (isYesDoc) {
      const typedocPrompt = typescriptMethodPrompt(
        functionConfig.tsconfig,
        functionConfig.package,
        functionConfig.prretierrc,
        existingFunctions,
      )
      const typedoc = (await chat(
        typedocPrompt.context,
        typedocPrompt.examples,
        aiAnswer,
        skeetAi.ai,
        false,
      )) as string
      await addStringTop(newFilePath, typedoc + '\n')
      console.log(chalk.white(`\n${log.common.addedDoc}`))
    }

    const createdText = `\n${log.common.created}: ${newFilePath}`
    console.log(chalk.white(createdText))
    console.log(chalk.white(log.methodMode.ExitingMode + '...\n'))
    await promptUser(skeetAi, logger)
    return
  } catch (error) {
    throw new Error(`methodMode: ${error}`)
  }
}

const extractFunctionName = (str: string) => {
  const match = str.match(/export const (\w+) =/)
  return match ? match[1] : null
}
