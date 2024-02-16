import { PATH } from '@/config/path'
import { toCamelCase, toPascalCase } from '@skeet-framework/utils'
import { existsSync, mkdirSync } from 'fs'

export const genOnCallMethodTypes = (methodName: string) => {
  const pascalMethodName = toPascalCase(methodName)
  const camelMethodName = toCamelCase(methodName)
  const httpPath = `${PATH.TYPE}/onCall`
  if (!existsSync(httpPath)) {
    mkdirSync(httpPath)
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
