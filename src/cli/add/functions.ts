import { SkeetCloudConfig, importConfig, importFirebaseConfig } from '@/index'
import { copyFileWithOverwrite } from '@/lib/copyFiles'
import { execSyncCmd } from '@/lib/execSyncCmd'
import { getModelFiles } from '@/lib/getModelFiles'
import {
  FIREBASE_CONFIG_PATH,
  FUNCTIONS_PATH,
  FUNCTIONS_REPO_URL,
  ROUTE_PACKAGE_JSON_PATH,
} from '@/lib/getSkeetConfig'
import { Logger } from '@/lib/logger'
import { skeetError } from '@/lib/skeetError'
import { functionsYml } from '@/templates/init'
import fs from 'fs'

export const addFunctions = async (functionName: string) => {
  try {
    const skeetConfig: SkeetCloudConfig = await importConfig()
    const functionDir = FUNCTIONS_PATH + `/${functionName}`
    if (fs.existsSync(functionDir)) {
      await Logger.error(`Already exist functionName: ${functionName}!`)
      return ''
    } else {
      const functions = await getModelFiles()
      const latestModel = functions[0]

      fs.mkdir(functionDir, { recursive: true }, (err) => {
        if (err) throw err
      })

      const gitCloneCmd = ['git', 'clone', FUNCTIONS_REPO_URL, functionDir]
      await execSyncCmd(gitCloneCmd)
      const rmDefaultGit = ['rm', '-rf', '.git']
      await execSyncCmd(rmDefaultGit, functionDir)
      fs.writeFileSync(
        `${functionDir}/.env`,
        `PROJECT_ID=${skeetConfig.app.projectId}\nREGION=${skeetConfig.app.region}`
      )
      const newModelPath = `${functionDir}/src/models`
      for await (const modelPath of latestModel.modelsPath) {
        const latestModelFileName = modelPath.split('/').pop()
        const newModelFileName = `${newModelPath}/${latestModelFileName}`
        Logger.sync(`📃 Copying ${modelPath} to ${newModelFileName}...`)
        await copyFileWithOverwrite(modelPath, `${newModelFileName}`)
      }
      await updateFirebaseConfig(functionName)
      await addFunctionsToPackageJson(functionName)
      const githubAction = await functionsYml(functionName)
      fs.writeFileSync(githubAction.filePath, githubAction.body)
    }
  } catch (error) {
    await skeetError('addFunctions', error)
  }
}

export const updateFirebaseConfig = async (functionName: string) => {
  const firebaseConfig = await importFirebaseConfig()
  const newFunction = {
    source: `functions/${functionName}`,
    codebase: functionName,
    ignore: [
      'node_modules',
      '.git',
      'firebase-debug.log',
      'firebase-debug.*.log',
    ],
  }
  firebaseConfig.functions.push(newFunction)
  fs.writeFileSync(
    FIREBASE_CONFIG_PATH,
    JSON.stringify(firebaseConfig, null, 2)
  )
  Logger.success('Successfully Updated firebase.json!')
}

export const addFunctionsToPackageJson = async (functionName: string) => {
  const packageJson = fs.readFileSync(ROUTE_PACKAGE_JSON_PATH)
  const newPackageJson = JSON.parse(String(packageJson))
  newPackageJson.scripts[
    `skeet:${functionName}`
  ] = `yarn --cwd ./functions/${functionName} dev`
  fs.writeFileSync(
    ROUTE_PACKAGE_JSON_PATH,
    JSON.stringify(newPackageJson, null, 2)
  )
  Logger.success('Successfully Updated ./package.json!')
}
