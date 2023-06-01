import { Logger } from '@/lib/logger'
import {
  readFileSync,
  writeFileSync,
  unlinkSync,
  existsSync,
  rmSync,
  mkdirSync,
} from 'fs'
import {
  firebaseSdkConfig,
  firebaseCreateWebProject,
  firebaseApplyWebProject,
  updateFirebaseJson,
} from '@/cli'

export const addFirebaseApp = async (appDisplayName: string) => {
  try {
    let sourceFilePath = './firebaseConfig.js'
    const firebaseConfigDir = './lib/firebaseAppConfig'
    const targetFilePath = `${firebaseConfigDir}/${appDisplayName}.ts`

    if (existsSync(sourceFilePath)) {
      rmSync(sourceFilePath)
    }
    if (!existsSync(firebaseConfigDir)) {
      mkdirSync(firebaseConfigDir, { recursive: true })
    }

    const appId = (await firebaseCreateWebProject(appDisplayName)) || ''
    await firebaseApplyWebProject(appDisplayName)
    await firebaseSdkConfig(appId)
    await updateFirebaseJson(appDisplayName)
    await rewriteFirebaseConfig(sourceFilePath, targetFilePath)

    return true
  } catch (error) {
    Logger.error(`addFirebaseApp: ${error}`)
  }
}

const rewriteFirebaseConfig = async (
  sourceFilePath: string,
  targetFilePath: string
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
    unlinkSync(sourceFilePath)

    Logger.successCheck(
      `File '${targetFilePath}' has been created successfully`
    )
    return true
  } catch (error) {
    throw new Error(`rewriteFirebaseConfig: ${error}`)
  }
}
