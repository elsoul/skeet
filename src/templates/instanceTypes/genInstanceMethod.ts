import { FUNCTIONS_PATH } from '@/lib'
import { genAuthMethod } from './genAuthMethod'
import { genFirestoreMethod } from './genFirestoreMethod'
import { genHttpMethod } from './genHttpMethod'
import { genHttpMethodParams } from './genHttpMethodParams'
import { genPubSubMethod } from './genPubSubMethod'
import { genScheduleMethod } from './genScheduleMethod'
import { genPubSubMethodParams } from './genPubSubMethodParams'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { PATH } from '@/config/path'
import { genOncallMethod } from './genOnCallMethod'
import { genOnCallMethodTypes } from './genOnCallMethodTypes'

export const genInstanceMethod = (
  instanceType: string,
  functionsName: string,
  methodName: string,
) => {
  try {
    if (!existsSync(PATH.TYPE)) {
      mkdirSync(PATH.TYPE)
    }
    switch (instanceType) {
      case 'onCall':
        addImportToIndex(instanceType, functionsName, methodName)
        const onCallParams = genOnCallMethodTypes(methodName)
        writeFileSync(onCallParams.filePath, onCallParams.body)
        return genOncallMethod(functionsName, methodName)
      case 'auth':
        addImportToIndex(instanceType, functionsName, methodName)
        return genAuthMethod(functionsName, methodName)
      case 'firestore':
        addImportToIndex(instanceType, functionsName, methodName)
        return genFirestoreMethod(functionsName, methodName)
      case 'pubsub':
        addImportToIndex(instanceType, functionsName, methodName)
        const pubsubParams = genPubSubMethodParams(methodName)
        writeFileSync(pubsubParams.filePath, pubsubParams.body)
        return genPubSubMethod(functionsName, methodName)
      case 'schedule':
        addImportToIndex(instanceType, functionsName, methodName)
        return genScheduleMethod(functionsName, methodName)
      default:
        addImportToIndex(instanceType, functionsName, methodName)
        const params = genHttpMethodParams(methodName)
        writeFileSync(params.filePath, params.body)
        return genHttpMethod(functionsName, methodName)
    }
  } catch (error) {
    throw new Error(`genInstanceMethod: ${error}`)
  }
}

export const appendLineToFile = (filePath: string, line: string) => {
  try {
    const fileContent = readFileSync(filePath, 'utf8')
    const updatedContent = fileContent.endsWith('\n')
      ? fileContent + line
      : fileContent + '\n' + line
    writeFileSync(filePath, updatedContent)
  } catch (error) {
    throw new Error(`appendLineToFile: ${error}`)
  }
}

const addImportToIndex = (
  instanceType: string,
  functionsName: string,
  methodName: string,
) => {
  try {
    const indexFilePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/${instanceType}/index.ts`
    const bodyLine = `export * from './${methodName}'`
    appendLineToFile(indexFilePath, bodyLine)
  } catch (error) {
    throw new Error(`addImportToIndex: ${error}`)
  }
}
