import { FUNCTIONS_PATH } from '@/lib'
import { genAuthMethod } from './genAuthMethod'
import { genFirestoreMethod } from './genFirestoreMethod'
import { genHttpMethod } from './genHttpMethod'
import { genHttpMethodParams } from './genHttpMethodParams'
import { genPubSubMethod } from './genPubSubMethod'
import { genScheduleMethod } from './genScheduleMethod'
import { genPubSubMethodParams } from './genPubSubMethodParams'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { PATH } from '@/config/path'
import { genOncallMethod } from './genOnCallMethod'
import { genOnCallMethodTypes } from './genOnCallMethodTypes'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'

export const genInstanceMethod = async (
  instanceType: string,
  functionsName: string,
  methodName: string,
) => {
  try {
    if (!(await checkFileDirExists(PATH.TYPE))) {
      await mkdir(PATH.TYPE)
    }
    switch (instanceType) {
      case 'onCall':
        await addImportToIndex(instanceType, functionsName, methodName)
        const onCallParams = await genOnCallMethodTypes(methodName)
        await writeFile(onCallParams.filePath, onCallParams.body)
        return genOncallMethod(functionsName, methodName)
      case 'auth':
        await addImportToIndex(instanceType, functionsName, methodName)
        return genAuthMethod(functionsName, methodName)
      case 'firestore':
        await addImportToIndex(instanceType, functionsName, methodName)
        return genFirestoreMethod(functionsName, methodName)
      case 'pubsub':
        await addImportToIndex(instanceType, functionsName, methodName)
        const pubsubParams = await genPubSubMethodParams(methodName)
        await writeFile(pubsubParams.filePath, pubsubParams.body)
        return genPubSubMethod(functionsName, methodName)
      case 'schedule':
        await addImportToIndex(instanceType, functionsName, methodName)
        return genScheduleMethod(functionsName, methodName)
      default:
        await addImportToIndex(instanceType, functionsName, methodName)
        const params = await genHttpMethodParams(methodName)
        await writeFile(params.filePath, params.body)
        return genHttpMethod(functionsName, methodName)
    }
  } catch (error) {
    throw new Error(`genInstanceMethod: ${error}`)
  }
}

export const appendLineToFile = async (filePath: string, line: string) => {
  try {
    const fileContent = await readFile(filePath, 'utf8')
    const updatedContent = fileContent.endsWith('\n')
      ? fileContent + line
      : fileContent + '\n' + line
    await writeFile(filePath, updatedContent)
  } catch (error) {
    throw new Error(`appendLineToFile: ${error}`)
  }
}

const addImportToIndex = async (
  instanceType: string,
  functionsName: string,
  methodName: string,
) => {
  try {
    const indexFilePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/${instanceType}/index.ts`
    const bodyLine = `export * from './${methodName}'`
    await appendLineToFile(indexFilePath, bodyLine)
  } catch (error) {
    throw new Error(`await addImportToIndex: ${error}`)
  }
}
