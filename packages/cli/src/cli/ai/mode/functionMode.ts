import { NamingEnum, SkeetAI } from '@skeet-framework/ai'
import { promptUser } from '../ai'
import inquirer from 'inquirer'
import { SkeetAiMode, SkeetInstanceType } from '@/types/skeetTypes'
import { getFunctions } from '@/lib'
import { spawnSync } from 'child_process'
import { AiLog } from '../aiLog'

export const functionMode = async (skeetAi: SkeetAI, logger: AiLog) => {
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
    }
    choices.push({ name: text, value: name })
  }
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'instanceType',
      message: log.functionMode.modeDesc,
      choices,
    },
  ])
  const answer2 = await inquirer.prompt([
    {
      type: 'input',
      name: 'input',
      message: log.functionMode.modeDesc2,
    },
  ])
  const namingAnswer = await skeetAi.naming(answer2.input, NamingEnum.FUNCTION)
  const cmd = `skeet add method ${namingAnswer} --instance ${answer.instanceType} --function ${functionName}`
  spawnSync(cmd, { stdio: 'inherit', shell: true })

  logger.addJson(
    'ai',
    answer.instanceType,
    SkeetAiMode.Function,
    String(skeetAi.initOptions.model),
  )
  console.log(log.functionMode.ExitingMode + '...\n')
  promptUser(skeetAi.initOptions, logger)
}
