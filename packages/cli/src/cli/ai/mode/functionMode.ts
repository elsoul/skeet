import { chat } from '@skeet-framework/ai'
import { promptUser } from '../ai'
import inquirer from 'inquirer'
import { SkeetInstanceType } from '@/types/skeetTypes'
import { getFunctions } from '@/lib/files/getFunctions'
import { AiLog } from '../aiLog'
import { SkeetAIOptions } from '..'
import { functionNamingPrompt } from '../skeetai/naming/prompt'
import { execAsync } from '@skeet-framework/utils'

export const functionMode = async (options: SkeetAIOptions, logger: AiLog) => {
  const log = logger.text() as SkeetLog
  console.log(log.functionMode.init)
  const functions = await getFunctions()
  let functionName = ''
  if (functions.length === 1) {
    functionName = functions[0]
  } else {
    functionName = (
      await inquirer.prompt<{ functionName: string }>([
        {
          type: 'list',
          message: log.functionMode.list1,
          name: 'functionName',
          choices: [new inquirer.Separator(' = Functions = '), ...functions],
          validate(functionName) {
            if (functionName.length < 1) {
              return 'You must choose at least one.'
            }
          },
        },
      ])
    ).functionName
  }
  const choices = []
  const skeetAiInstanceTypeValues: string[] = Object.values(SkeetInstanceType)
  for (const name of skeetAiInstanceTypeValues) {
    let text = ''
    if (name === 'http') {
      text = `${name} ` + log.functionMode.http || ''
    } else if (`${name}` === 'pubsub') {
      text = `${name} ` + log.functionMode.pubsub || ''
    } else if (`${name}` === 'auth') {
      text = `${name} ` + log.functionMode.auth || ''
    } else if (`${name}` === 'firestore') {
      text = `${name} ` + log.functionMode.firestore || ''
    } else if (`${name}` === 'storage') {
      text = `${name} ` + log.functionMode.storage || ''
    } else if (`${name}` === 'schedule') {
      text = `${name} ` + log.functionMode.schedule || ''
    } else if (`${name}` === 'onCall') {
      text = `${name} ` + log.functionMode.onCall || ''
    }
    choices.push({ name: text, value: name })
  }
  const answer = await inquirer.prompt<{ instanceType: string; input: string }>(
    [
      {
        type: 'list',
        name: 'instanceType',
        message: log.functionMode.modeDesc,
        choices,
      },
      {
        type: 'input',
        name: 'input',
        message: log.functionMode.modeDesc2,
      },
    ],
  )
  const namingPrompt = functionNamingPrompt(await getFunctions())
  const namingAnswer = (await chat(
    namingPrompt.context,
    namingPrompt.examples,
    answer.input,
    options.ai,
    false,
  )) as string
  const cmd = `skeet add method --methodName ${namingAnswer} --instance ${answer.instanceType} --function ${functionName}`
  await execAsync(cmd)

  console.log(log.functionMode.ExitingMode + '...\n')
  await promptUser(options, logger)
}
