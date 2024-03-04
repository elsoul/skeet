import { PATH } from '@/config/path'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { toCamelCase, toPascalCase } from '@skeet-framework/utils'
import { mkdir } from 'fs/promises'

export const genPubSubMethodParams = async (methodName: string) => {
  const pascalMethodName = toPascalCase(methodName)
  const camelMethodName = toCamelCase(methodName)
  const pubsubPath = `${PATH.TYPE}/pubsub`
  if (!(await checkFileDirExists(pubsubPath))) {
    await mkdir(pubsubPath)
  }
  const filePath = `${pubsubPath}/${camelMethodName}Params.ts`
  const body = `export type ${pascalMethodName}Params = {
  name?: string
}`
  return {
    filePath,
    body,
  }
}
