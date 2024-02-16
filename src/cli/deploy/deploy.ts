import inquirer from 'inquirer'
import { importConfig, getFunctions } from '@/lib'
import { deployWebApp } from './deployWebApp'
import { deployRules } from './deployRules'
import { firebaseFunctionsDeploy } from './firebaseDeploy'
import { deployGraphql } from './deployGraphql'
import { spawnSync } from 'child_process'
import { pnpmBuild } from '@/lib/pnpmBuild'

export const deploy = async () => {
  const functions = getFunctions()
  let functionsArray: Array<{ [key: string]: string }> = [{ name: 'webapp' }]
  const { app } = importConfig()
  if (app.template.includes('GraphQL')) {
    functionsArray.push({ name: 'graphql' })
  }
  if (app.template.includes('SQL')) {
    functionsArray.push({ name: 'sql' })
  }
  for await (const functionName of functions) {
    functionsArray.push({ name: functionName })
  }
  if (app.template.includes('Backend Only')) {
    functionsArray = functionsArray.filter((f) => f.name !== 'webapp')
  }
  if (functionsArray.length === 1) {
    spawnSync(`pnpm -F ${functionsArray[0].name}-func build`, {
      stdio: 'inherit',
    })
    await firebaseFunctionsDeploy(app.fbProjectId, functionsArray[0].name)
    return
  }

  const answer = await inquirer.prompt<{ functions: Array<string> }>([
    {
      type: 'checkbox',
      message: 'Select Services to run functions command',
      name: 'functions',
      choices: [new inquirer.Separator(' = Services = '), ...functionsArray],
      validate(answer) {
        if (answer.length < 1) {
          return 'You must choose at least one service.'
        }

        return true
      },
    },
  ])

  if (answer.functions.length > 0) {
    for await (const service of answer.functions) {
      const config = importConfig()
      if (service === 'webapp') {
        await deployWebApp()
        await deployRules(config.app.projectId)
      } else if (service === 'graphql' || service === 'sql') {
        await deployGraphql(config)
      } else {
        pnpmBuild(service)
        await firebaseFunctionsDeploy(config.app.fbProjectId, service)
      }
    }
  }
}
