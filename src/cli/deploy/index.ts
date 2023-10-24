import { program } from '@/index'
import { deploy } from './deploy'
import { yarnBuild } from '../yarn/yarnBuild'
import { importConfig } from '@/lib'
import { firebaseFunctionsDeploy } from './firebaseDeploy'

export const deployCommands = async () => {
  program
    .command('deploy')
    .option('-f, --function <function>', 'Function Name. e.g. skeet:root')
    .description('Deploy Skeet APP to Firebase')
    .action(async (options) => {
      if (options.function) {
        const { app } = await importConfig()
        const functionName = options.function.split(':')[0]
        const methodName = options.function.split(':')[1]
        await yarnBuild(functionName)
        await firebaseFunctionsDeploy(app.fbProjectId, functionName, methodName)
        return
      }
      await deploy()
    })
}
