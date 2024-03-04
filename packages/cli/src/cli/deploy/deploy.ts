import inquirer from 'inquirer'
import { importConfig } from '@/lib/files/importConfig'
import { getFunctions } from '@/lib/files/getFunctions'
import { deployWebApp } from '@/cli/deploy/deployWebApp'
import { deployRules } from '@/cli/deploy/deployRules'
import { firebaseFunctionsDeploy } from '@/cli/deploy/firebaseDeploy'
import { deployGraphql } from '@/cli/deploy/deployGraphql'
import { pnpmBuild } from '@/lib/pnpmBuild'
import { execSyncCmd } from '@/lib/execSyncCmd'

export const deploy = async () => {
  const functions = await getFunctions()
  let functionsArray: Array<{ [key: string]: string }> = [{ name: 'webapp' }]
  const { app } = await importConfig()
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
    const cmd = ['pnpm', '-F', `${functionsArray[0].name}-func`, 'build']
    await execSyncCmd(cmd)
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
      const config = await importConfig()
      if (service === 'webapp') {
        await deployWebApp()
        await deployRules(config.app.projectId)
      } else if (service === 'sql') {
        await deployGraphql(config)
      } else {
        await pnpmBuild(service)
        await firebaseFunctionsDeploy(config.app.fbProjectId, service)
      }
    }
  }
}
