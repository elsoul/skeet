import inquirer from 'inquirer'
import { getFunctions } from '@/lib/files/getFunctions'
import { deployWebApp } from '@/cli/deploy/deployWebApp'
import { deployRules } from '@/cli/deploy/deployRules'
import { firebaseFunctionsDeploy } from '@/cli/deploy/firebaseDeploy'
import { pnpmBuild } from '@/lib/pnpmBuild'
import { execAsyncCmd } from '@/lib/execAsyncCmd'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { deployCloudRunForSQL } from './deployCloudRunForSQL'
import { getSQLs } from '@/lib/files/getSQLs'

export const deploy = async () => {
  const functions = await getFunctions()
  const sqls = await getSQLs()
  const { app } = await readOrCreateConfig()
  const functionsArray: Array<{ name: string }> = []
  for await (const functionName of functions) {
    functionsArray.push({ name: functionName })
  }
  if (sqls.length > 0) {
    for await (const sql of sqls) {
      functionsArray.push({ name: sql })
    }
  }
  if (functionsArray.length === 1) {
    await pnpmBuild(functionsArray[0].name)
    await firebaseFunctionsDeploy(app.projectId, functionsArray[0].name)
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
      const config = await readOrCreateConfig()
      if (service === 'webapp') {
        await deployWebApp()
        await deployRules(config.app.projectId)
      } else if (service.endsWith('db')) {
        await deployCloudRunForSQL(service)
      } else {
        await pnpmBuild(service)
        await firebaseFunctionsDeploy(config.app.projectId, service)
      }
    }
  }
}
