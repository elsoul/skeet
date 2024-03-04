// import chalk from 'chalk'
// import { promptUser } from '../ai'
// import { yesOrNo } from './yesOrNoMode'
// import {
//   FUNCTIONS_PATH,
//   getFilesInDirectory,
//   getFunctionConfig,
//   getFunctionModelFiles,
//   getFunctions,
// } from '@/lib'
// import { NamingEnum } from '@skeet-framework/ai'
// import { SkeetAiMode, SkeetRole } from '@/types/skeetTypes'
// import inquirer from 'inquirer'
// import { addStringTop } from '@/lib/files/addStringTop'
// import { AiLog } from '../aiLog'
// import { SkeetAIOptions } from '..'

// export const methodMode = async (skeetAi: SkeetAIOptions, logger: AiLog) => {
//   try {
//     const log = logger.text() as SkeetLog
//     console.log(chalk.cyan(log.methodMode.init))
//     const model = String(skeetAi.initOptions.model)

//     const functionName = await inquirer.prompt([
//       {
//         type: 'list',
//         name: 'functionName',
//         message: log.methodMode.list1,
//         choices: await getFunctions(),
//       },
//     ])
//     const inputMessage =
//       log.methodMode.modeDesc +
//       '\n\n' +
//       log.common.example +
//       log.methodMode.example1 +
//       '\n\n' +
//       chalk.green(log.common.you + ':')

//     logger.addJson(SkeetRole.AI, inputMessage, SkeetAiMode.Method, model)
//     const input = await inquirer.prompt([
//       {
//         type: 'input',
//         name: 'input',
//         message: inputMessage,
//       },
//     ])
//     logger.addJson(SkeetRole.USER, input.input, SkeetAiMode.Method, model)
//     const functionConfig = await getFunctionConfig(functionName.functionName)
//     const files = getFilesInDirectory(
//       `${FUNCTIONS_PATH}/${functionName.functionName}/src/lib`,
//     ).filter((file) => file.name.replace('.ts', ''))

//     const existingFunctions = files.map((file) => file.name).join(',')

//     const existingModels = getFunctionModelFiles(functionName.functionName)
//     logger.addJson(SkeetRole.USER, input.input, SkeetAiMode.Method, model)

//     const aiAnswer = (
//       await skeetAi.method(
//         input.input,
//         functionConfig.tsconfig,
//         functionConfig.package,
//         functionConfig.prretierrc,
//         existingFunctions,
//         existingModels,
//       )
//     )
//       ?.replaceAll('```\n', '')
//       .replaceAll('```', '') as string

//     const nameSuggestion = extractFunctionName(aiAnswer)

//     const skeetRes =
//       'Skeet:' +
//       chalk.white(` ${log.common.howAboutThis}\n`) +
//       `${chalk.white(`\`\`\`${nameSuggestion}.ts\n`)}` +
//       chalk.white(aiAnswer) +
//       `${chalk.white('\n```')}`
//     console.log(chalk.blue(skeetRes))
//     logger.addJson(SkeetRole.AI, skeetRes, SkeetAiMode.Method, model)
//     const newFilePath = `${FUNCTIONS_PATH}/${functionName.functionName}/src/lib/${nameSuggestion}.ts`
//     const text = ` ${log.common.MayICreateFile}: \n ${newFilePath}`
//     logger.addJson(SkeetRole.AI, aiAnswer + text, SkeetAiMode.Method, model)
//     const isYes = await yesOrNo(text)
//     if (!isYes) {
//       logger.addJson(SkeetRole.USER, 'No', SkeetAiMode.Method, model)
//       methodMode(skeetAi, logger)
//       return
//     }
//     logger.addJson(SkeetRole.USER, 'Yes', SkeetAiMode.Method, model)
//     writeFileSync(newFilePath, aiAnswer)

//     const typedocText = ` ${log.common.MayIAddDoc}`
//     const isYesDoc = await yesOrNo(typedocText)
//     if (isYesDoc) {
//       const typedoc = await skeetAi.typedoc(aiAnswer)
//       await addStringTop(newFilePath, typedoc + '\n')
//       console.log(chalk.white(`\n${log.common.addedDoc}`))
//     }

//     const createdText = `\n${log.common.created}: ${newFilePath}`
//     console.log(chalk.white(createdText))
//     logger.addJson(SkeetRole.USER, createdText, SkeetAiMode.Method, model)
//     console.log(chalk.white(log.methodMode.ExitingMode + '...\n'))
//     promptUser(skeetAi.initOptions, logger)
//     return
//   } catch (error) {
//     throw new Error(`methodMode: ${error}`)
//   }
// }

// const extractFunctionName = (str: string) => {
//   const match = str.match(/export const (\w+) =/)
//   return match ? match[1] : null
// }
