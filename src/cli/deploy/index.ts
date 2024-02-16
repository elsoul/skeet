import { DEFAULT_FUNCTION_NAME, program } from '@/index'
import { deploy } from './deploy'
import { FUNCTIONS_PATH, importConfig } from '@/lib'
import { firebaseFunctionsDeploy } from './firebaseDeploy'
import { spawnSync } from 'node:child_process'
import { sqlDeploy } from './sqlDeploy'
import { pnpmBuild } from '../../lib/pnpmBuild'

export const deployCommands = async () => {
  program
    .command('deploy')
    .option('-f, --function <function>', 'Function Name. e.g. skeet:root')
    .option('-d, --discord', 'Deploy Discord Commands', false)
    .option('--sql', 'Deploy SQL', false)
    .description('Deploy Skeet APP to Firebase')
    .action(async (options) => {
      if (options.function) {
        const { app } = importConfig()
        const functionName = options.function.split(':')[0]
        const methodName = options.function.split(':')[1]
        pnpmBuild(functionName)
        await firebaseFunctionsDeploy(
          app.fbProjectId,
          functionName,
          `functions:${functionName}:${methodName}`,
        )
        return
      } else if (options.discord) {
        pnpmBuild(DEFAULT_FUNCTION_NAME)
        return
      } else if (options.sql) {
        sqlDeploy()
        return
      }
      await deploy()
    })
}
