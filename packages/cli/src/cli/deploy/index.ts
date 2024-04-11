import { program } from '@/index'
import { deploy } from './deploy'
import { firebaseFunctionsDeploy } from './firebaseDeploy'
import { sqlDeploy } from '@/cli/deploy/sqlDeploy'
import { pnpmBuild } from '@/lib/pnpmBuild'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'

export const deployCommands = async () => {
  program
    .command('deploy')
    .option('-f, --function <function>', 'Function Name. e.g. skeet:root')
    .option('-d, --discord', 'Deploy Discord Commands', false)
    .option('--sql', 'Deploy NOT_CREATED Cloud SQLs', false)
    .description('Deploy Skeet APP to Firebase')
    .action(async (options) => {
      if (options.function) {
        const { app } = await readOrCreateConfig()
        const functionName = options.function.split(':')[0]
        const methodName = options.function.split(':')[1]
        await pnpmBuild(functionName)
        await firebaseFunctionsDeploy(
          app.projectId,
          functionName,
          `functions:${functionName}:${methodName}`,
        )
        return
      } else if (options.discord) {
        //await pnpmBuild(DEFAULT_FUNCTION_NAME)
        console.log(`Coming Soon...🤫`)
        return
      } else if (options.sql) {
        await sqlDeploy()
        return
      }
      await deploy()
    })
}
