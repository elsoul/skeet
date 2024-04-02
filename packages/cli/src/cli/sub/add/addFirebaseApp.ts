import { readFile, writeFile, unlink, rm, mkdir } from 'fs/promises'
import {
  Logger,
  firebaseSdkConfig,
  firebaseCreateWebProject,
  firebaseApplyWebProject,
  updateFirebaseJson,
  firebaseAppList,
} from '@/lib'
import { copyDefaultFirebaseConfig } from '@/lib/files/addJson'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'

export const addFirebaseApp = async (
  projectId: string,
  appDisplayName: string,
) => {
  try {
    const sourceFilePath = './firebaseConfig.js'
    const firebaseConfigDir = './lib/firebaseAppConfig'
    const targetFilePathTs = `${firebaseConfigDir}/${appDisplayName}.ts`

    if (await checkFileDirExists(sourceFilePath)) {
      await rm(sourceFilePath)
    }
    if (!(await checkFileDirExists(firebaseConfigDir))) {
      await mkdir(firebaseConfigDir, { recursive: true })
    }
    const appList = await firebaseAppList()
    if (checkAppExistence(appList, appDisplayName)) {
      console.log('App already exists. Skipping...')
      return
    }

    const appId = (await firebaseCreateWebProject(appDisplayName)) || ''
    await firebaseApplyWebProject(projectId, appDisplayName)
    await firebaseSdkConfig(appId)
    await updateFirebaseJson(appDisplayName)
    await rewriteFirebaseConfig(sourceFilePath, targetFilePathTs)
    await unlink(sourceFilePath)
    await copyDefaultFirebaseConfig(appDisplayName)

    return true
  } catch (error) {
    Logger.normal(`addFirebaseApp: ${error}`)
  }
}

const rewriteFirebaseConfig = async (
  sourceFilePath: string,
  targetFilePath: string,
) => {
  try {
    const data = await readFile(sourceFilePath, 'utf8')
    const modifiedData = data.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')

    const match = modifiedData.match(/firebase\.initializeApp\(({[\s\S]+?})\);/)
    if (!match) {
      console.error('Firebase initialization code not found in the file.')
      return
    }

    const config = match[1]
    const parsedConfig = JSON.parse(config)
    const formattedConfig = Object.entries(parsedConfig)
      .map(([key, value]) => `  ${key}: ${JSON.stringify(value)},`)
      .join('\n')

    const finalData = `const firebaseConfig = {\n${formattedConfig}\n}\nexport default firebaseConfig;`

    await writeFile(targetFilePath, finalData, 'utf8')

    Logger.successCheck(
      `File '${targetFilePath}' has been created successfully`,
    )
    return true
  } catch (error) {
    throw new Error(`rewriteFirebaseConfig: ${error}`)
  }
}

interface App {
  'App Display Name': string
  'App ID': string
  Platform: string
}

const checkAppExistence = (appList: App[], appName: string): boolean => {
  return appList.some((app) => app['App Display Name'] === appName)
}
