import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import { existsSync, mkdirSync } from 'fs'

export const helloIndex = () => {
  const fileDir = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/lib/discord/commands`
  if (!existsSync(fileDir)) {
    mkdirSync(fileDir, { recursive: true })
  }
  const filePath = `${fileDir}/index.ts`
  const body = `import * as hello from './hello'

export const commands = {
  hello,
}  
`
  return {
    filePath,
    body,
  }
}
