import { Logger } from '@/lib/logger'
import { genAuthMethod } from './genAuthMethod'
import { genFirestoreMethod } from './genFirestoreMethod'
import { genHttpMethod } from './genHttpMethod'
import { genHttpMethodParams } from './genHttpMethodParams'
import { genPubSubMethod } from './genPubSubMethod'
import { genSchedulerMethod } from './genSchedulerMethod'
import fs from 'fs'
import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'

export const genInstanceMethod = async (
  instanceType: string,
  functionsName: string,
  methodName: string
) => {
  try {
    switch (instanceType) {
      case 'auth':
        addImpostToIndex(instanceType, functionsName, methodName)
        return await genAuthMethod(functionsName, methodName)
      case 'firestore':
        addImpostToIndex(instanceType, functionsName, methodName)
        return await genFirestoreMethod(functionsName, methodName)
      case 'pubsub':
        addImpostToIndex(instanceType, functionsName, methodName)
        return await genPubSubMethod(functionsName, methodName)
      case 'scheduler':
        addImpostToIndex(instanceType, functionsName, methodName)
        return await genSchedulerMethod(functionsName, methodName)
      default:
        addImpostToIndex(instanceType, functionsName, methodName)
        const params = await genHttpMethodParams(functionsName, methodName)
        fs.writeFileSync(params.filePath, params.body)
        Logger.success(`✔️ ${params.filePath} created!`)
        return await genHttpMethod(functionsName, methodName)
    }
  } catch (error) {
    throw new Error(`genInstanceMethod: ${error}`)
  }
}

const appendLineToFile = (filePath: string, line: string) => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const updatedContent = fileContent.endsWith('\n')
      ? fileContent + line
      : fileContent + '\n' + line
    fs.writeFileSync(filePath, updatedContent)
  } catch (error) {
    throw new Error(`appendLineToFile: ${error}`)
  }
}

const addImpostToIndex = (
  instanceType: string,
  functionsName: string,
  methodName: string
) => {
  try {
    const indexFilePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/${instanceType}/index.ts`
    const bodyLine = `export * from './${methodName}'`
    appendLineToFile(indexFilePath, bodyLine)
  } catch (error) {
    throw new Error(`addImpostToIndex: ${error}`)
  }
}
