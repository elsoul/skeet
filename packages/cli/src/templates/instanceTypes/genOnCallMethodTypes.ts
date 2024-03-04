import { PATH } from '@/config/path'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { toCamelCase, toPascalCase } from '@skeet-framework/utils'
import { mkdir } from 'fs/promises'

export const genOnCallMethodTypes = async (methodName: string) => {
  const pascalMethodName = toPascalCase(methodName)
  const httpPath = `${PATH.TYPE}/onCall`
  if (!(await checkFileDirExists(httpPath))) {
    await mkdir(httpPath)
  }
  const filePath = `${httpPath}/onCall${pascalMethodName}Types.ts`
  const body = `export type OnCall${pascalMethodName}Params = {
  name?: string
}

export type OnCall${pascalMethodName}Response = {
  status: 'success' | 'error'
  message: string
}
`
  return {
    filePath,
    body,
  }
}
