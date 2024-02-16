import {
  BACKEND_GRAPHQL_REPO_URL,
  SKEET_CONFIG_PATH,
  importConfig,
} from '@/lib'
import chalk from 'chalk'
import { spawnSync } from 'child_process'
import { writeFileSync } from 'fs'

export const addGraphQL = async () => {
  try {
    const config = importConfig()
    if (config.app.template.includes('GraphQL')) {
      console.log(chalk.yellow(`⚠️ GraphQL is already added.`))
      return
    } else {
      const tmpPath = './graphqlTmp'
      const mkdirTmp = ['mkdir', tmpPath]
      spawnSync(mkdirTmp[0], mkdirTmp.slice(1), { stdio: 'inherit' })
      const gitCloneCmd = ['git', 'clone', BACKEND_GRAPHQL_REPO_URL, tmpPath]
      spawnSync(gitCloneCmd[0], gitCloneCmd.slice(1), { stdio: 'inherit' })
      const graphqlRoot = './graphql'
      const mkdir = ['mkdir', graphqlRoot]
      spawnSync(mkdir[0], mkdir.slice(1), { stdio: 'inherit' })
      const cmd = ['cp', '-r', `${tmpPath}/graphql`, '.']
      spawnSync(cmd[0], cmd.slice(1), { stdio: 'inherit' })
      const rmTmp = ['rm', '-rf', tmpPath]
      spawnSync(rmTmp[0], rmTmp.slice(1), { stdio: 'inherit' })
      config.app.template = `${config.app.template} + GraphQL`
      writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(config, null, 2))
    }
    console.log(chalk.green(`✅ GraphQL is added 🎉`))
    return true
  } catch (error) {
    throw new Error(`addBackendSetup: ${error}`)
  }
}
