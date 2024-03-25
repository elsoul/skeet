import { DEFAULT_FUNCTION_NAME, program } from '@/index'
import { deploy } from './deploy'
import { importConfig } from '@/lib/files/importConfig'
import { firebaseFunctionsDeploy } from './firebaseDeploy'
import { sqlDeploy } from '@/cli/deploy/sqlDeploy'
import { pnpmBuild } from '@/lib/pnpmBuild'

export const deployCommands = async () => {
  program
    .command('deploy')
    .option('-f, --function <function>', 'Function Name. e.g. skeet:root')
    .option('-d, --discord', 'Deploy Discord Commands', false)
    .option('--sql', 'Deploy SQL', false)
    .description('Deploy Skeet APP to Firebase')
    .action(async (options) => {
      if (options.function) {
        // const { app } = await importConfig()
        // const functionName = options.function.split(':')[0]
        // const methodName = options.function.split(':')[1]
        // await pnpmBuild(functionName)
        // await firebaseFunctionsDeploy(
        //   app.fbProjectId,
        //   functionName,
        //   `functions:${functionName}:${methodName}`,
        // )
        // return
      } else if (options.discord) {
        //await pnpmBuild(DEFAULT_FUNCTION_NAME)
        return
      } else if (options.sql) {
        await sqlDeploy()
        return
      }
      await deploy()
    })
}
