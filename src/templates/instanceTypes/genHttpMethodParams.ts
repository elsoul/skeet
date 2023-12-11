import { PATH } from '@/cli/config/path'
import { existsSync, mkdirSync } from 'fs'

export const genHttpMethodParams = (methodName: string) => {
  const firstChar = methodName.charAt(0).toUpperCase()
  const capitalizedMethodName = firstChar + methodName.slice(1)
  const httpPath = `${PATH.TYPE_PATH}/http`
  if (!existsSync(httpPath)) {
    mkdirSync(httpPath)
  }
  const filePath = `${httpPath}/${methodName}Params.ts`
  const body = `export type ${capitalizedMethodName}Params = {
  name?: string
}`
  return {
    filePath,
    body,
  }
}
