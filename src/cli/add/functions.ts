import { SkeetCloudConfig, importConfig, importFirebaseConfig } from '@/index'
import { execSyncCmd } from '@/lib/execSyncCmd'
import {
  FIREBASE_CONFIG_PATH,
  FUNCTIONS_PATH,
  FUNCTIONS_REPO_URL,
  ROUTE_PACKAGE_JSON_PATH,
  SKEET_CONFIG_PATH,
  getFunctionInfo,
} from '@/lib/getSkeetConfig'
import { Logger } from '@/lib/logger'
import { skeetError } from '@/lib/skeetError'
import { functionsYml } from '@/templates/init'
import { HttpsOptions } from 'firebase-functions/v2/https'
import fs from 'fs'

export const addFunctions = async (functionName: string) => {
  try {
    const functionDir = FUNCTIONS_PATH + `/${functionName}`
    if (fs.existsSync(functionDir)) {
      await Logger.error(`Already exist functionName: ${functionName}!`)
      return ''
    } else {
      fs.mkdir(functionDir, { recursive: true }, (err) => {
        if (err) throw err
      })
      const gitCloneCmd = ['git', 'clone', FUNCTIONS_REPO_URL, functionDir]
      await execSyncCmd(gitCloneCmd)
      const rmDefaultGit = ['rm', '-rf', '.git']
      await execSyncCmd(rmDefaultGit, functionDir)
      await updateSkeetCloudConfig(functionName)
      await updateFirebaseConfig(functionName)
      await addFunctionsToPackageJson(functionName)
      await functionsYml(functionName)
    }
  } catch (error) {
    await skeetError('addFunctions', error)
  }
}

export const updateSkeetCloudConfig = async (functionName: string) => {
  const skeetConfig: SkeetCloudConfig = await importConfig()
  const region = skeetConfig.app.region || 'europe-west4'
  const functionInfo = await getFunctionInfo(functionName)
  const httpsOptions: HttpsOptions = {
    region,
    cpu: 1,
    memory: '1GiB',
    maxInstances: 100,
    minInstances: 0,
    concurrency: 10,
    ingressSettings: 'ALLOW_INTERNAL_AND_GCLB',
    vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
  }
  const newFunction = {
    name: functionInfo.name,
    methods: [
      {
        name: 'hello',
        url: '',
        httpsOptions,
      },
    ],
  }
  skeetConfig.functions.push(newFunction)
  fs.writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  Logger.success('Successfully Updated skeet-cloud.config.json!')
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
