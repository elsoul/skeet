import { DEFAULT_FUNCTION_NAME, program } from '@/index'
import { deploy } from './deploy'
import { yarnBuild } from '../yarn/yarnBuild'
import { FUNCTIONS_PATH, importConfig } from '@/lib'
import { firebaseFunctionsDeploy } from './firebaseDeploy'
import { spawnSync } from 'node:child_process'

export const deployCommands = async () => {
  program
    .command('deploy')
    .option('-f, --function <function>', 'Function Name. e.g. skeet:root')
    .option('-d, --discord', 'Deploy Discord Commands', false)
    .description('Deploy Skeet APP to Firebase')
    .action(async (options) => {
      if (options.function) {
        const { app } = importConfig()
        const functionName = options.function.split(':')[0]
        const methodName = options.function.split(':')[1]
        await yarnBuild(functionName)
        await firebaseFunctionsDeploy(
          app.fbProjectId,
          functionName,
          `functions:${functionName}:${methodName}`,
        )
        return
      } else if (options.discord) {
        const cmd = `yarn --cwd ${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME} discord:deploy`
        spawnSync(cmd, { stdio: 'inherit', shell: true })
        return
      }
      await deploy()
    })
}
