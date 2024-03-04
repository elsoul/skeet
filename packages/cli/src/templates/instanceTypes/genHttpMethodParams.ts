import { PATH } from '@/config/path'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { toCamelCase, toPascalCase } from '@skeet-framework/utils'
import { mkdir } from 'fs/promises'

export const genHttpMethodParams = async (methodName: string) => {
  const pascalMethodName = toPascalCase(methodName)
  const camelMethodName = toCamelCase(methodName)
  const httpPath = `${PATH.TYPE}/http`
  if (!(await checkFileDirExists(httpPath))) {
    await mkdir(httpPath)
  }
  const filePath = `${httpPath}/${camelMethodName}Params.ts`
  const body = `export type ${pascalMethodName}Params = {
  name?: string
}`
  return {
    filePath,
    body,
  }
}
