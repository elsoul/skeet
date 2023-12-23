import { PATH } from '@/cli/config/path'
import { toCamelCase, toPascalCase } from '@skeet-framework/utils'
import { existsSync, mkdirSync } from 'fs'

export const genPubSubMethodParams = (methodName: string) => {
  const pascalMethodName = toPascalCase(methodName)
  const camelMethodName = toCamelCase(methodName)
  const pubsubPath = `${PATH.TYPE_PATH}/pubsub`
  if (!existsSync(pubsubPath)) {
    mkdirSync(pubsubPath)
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
