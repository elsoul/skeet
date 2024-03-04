import { DEFAULT_FUNCTION_NAME } from '@/index'
import { Logger } from '@/lib/logger'
import {
  firebaserc,
  firestoreIndexesJson,
  skeetCloudConfigGen,
} from '@/templates/init'
import { SkeetTemplate } from '@/types/skeetTypes'
import { convertFromKebabCaseToLowerCase } from '@skeet-framework/utils'
import { readFile, writeFile } from 'fs/promises'

export const generateInitFiles = async (appName: string, template: string) => {
  const spinner = Logger.syncSpinner('Generating init files...')
  await initPackageJson(appName)
  if (template === SkeetTemplate.ExpoFirestore) {
    await initAppJson(appName)
  }
  if (template === SkeetTemplate.SolanaFirestore) {
    await initAppJson(appName)
  }

  if (template !== 'Backend Only - GraphQL') {
    await addAppNameToSkeetOptions(appName, DEFAULT_FUNCTION_NAME)
  }

  const firebasercFile = await firebaserc(appName)
  await writeFile(firebasercFile.filePath, firebasercFile.body)

  const firestoreIndexesJsonFile = await firestoreIndexesJson(appName)
  await writeFile(
    firestoreIndexesJsonFile.filePath,
    firestoreIndexesJsonFile.body,
  )

  const skeetCloudConfigGenFile = await skeetCloudConfigGen(appName, template)
  await writeFile(
    skeetCloudConfigGenFile.filePath,
    skeetCloudConfigGenFile.body,
  )
  spinner.stop()
}

export const initPackageJson = async (appName: string) => {
  try {
    const filePath = `./${appName}/package.json`
    const packageJson = await readFile(filePath)
    const newPackageJson = JSON.parse(String(packageJson))
    newPackageJson.name = appName
    newPackageJson.version = '0.0.1'
    newPackageJson.description = `Full-stack Serverless Framework Skeet ${appName} App`
    await writeFile(filePath, JSON.stringify(newPackageJson, null, 2))
  } catch (error) {
    throw new Error(`initPackageJson: ${error}`)
  }
}

export const initAppJson = async (appName: string) => {
  const appDir = './' + appName
  const filePath = `${appDir}/app.json`
  const appJson = await readFile(filePath)
  const newAppJson = JSON.parse(String(appJson))
  const appNameLowerCase = convertFromKebabCaseToLowerCase(appName)
  newAppJson.expo.name = appName
  newAppJson.expo.slug = appName
  newAppJson.expo.scheme = appNameLowerCase
  newAppJson.expo.owner = 'openai'
  newAppJson.expo.githubUrl = `https://github.com/YOUR_ACCOUNT/${appName}`
  newAppJson.expo.android.package = `com.skeet.${appNameLowerCase}`
  newAppJson.expo.ios.bundleIdentifier = `com.skeet.${appNameLowerCase}`
  await writeFile(filePath, JSON.stringify(newAppJson, null, 2))
}

export const addAppNameToSkeetOptions = async (
  appName: string,
  functionName: string,
) => {
  try {
    const filePath = `./${appName}/functions/${functionName}/skeetOptions.json`
    const jsonFile = await readFile(filePath)
    const skeetOptions = JSON.parse(String(jsonFile))
    skeetOptions.name = appName
    await writeFile(filePath, JSON.stringify(skeetOptions, null, 2))
  } catch (error) {
    throw new Error(`addAppNameToSkeetOptions: ${error}`)
  }
}
