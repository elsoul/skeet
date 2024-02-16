import { PATH } from '@/config/path'
import { toCamelCase, toPascalCase } from '@skeet-framework/utils'
import { existsSync, mkdirSync } from 'fs'

export const genHttpMethodParams = (methodName: string) => {
  const pascalMethodName = toPascalCase(methodName)
  const camelMethodName = toCamelCase(methodName)
  const httpPath = `${PATH.TYPE}/http`
  if (!existsSync(httpPath)) {
    mkdirSync(httpPath)
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
