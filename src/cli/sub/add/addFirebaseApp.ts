import {
  readFileSync,
  writeFileSync,
  unlinkSync,
  existsSync,
  rmSync,
  mkdirSync,
} from 'fs'
import {
  Logger,
  firebaseSdkConfig,
  firebaseCreateWebProject,
  firebaseApplyWebProject,
  updateFirebaseJson,
  firebaseAppList,
} from '@/lib'
import { copyDefaultFirebaseConfig } from '@/lib/files/addJson'

export const addFirebaseApp = async (
  projectId: string,
  appDisplayName: string,
) => {
  try {
    const sourceFilePath = './firebaseConfig.js'
    const firebaseConfigDir = './lib/firebaseAppConfig'
    const targetFilePathTs = `${firebaseConfigDir}/${appDisplayName}.ts`

    if (existsSync(sourceFilePath)) {
      rmSync(sourceFilePath)
    }
    if (!existsSync(firebaseConfigDir)) {
      mkdirSync(firebaseConfigDir, { recursive: true })
    }
    const appList = await firebaseAppList()
    if (checkAppExistence(appList, appDisplayName))
      throw new Error(
        `Default Firebase App '${appDisplayName}' already exists. Skipping the firebase config creating process... Delete the Firebase webapp on the web console if you want to create a new one. Then run 'skeet init' again. It will create the new webapp and the firebaseConfig files.`,
      )

    const appId = (await firebaseCreateWebProject(appDisplayName)) || ''
    await firebaseApplyWebProject(projectId, appDisplayName)
    await firebaseSdkConfig(appId)
    await updateFirebaseJson(appDisplayName)
    await rewriteFirebaseConfig(sourceFilePath, targetFilePathTs)
    unlinkSync(sourceFilePath)
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
    const data = readFileSync(sourceFilePath, 'utf8')
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

    writeFileSync(targetFilePath, finalData, 'utf8')

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
