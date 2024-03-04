import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { mkdir } from 'fs/promises'

export const helloIndex = async () => {
  const fileDir = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/lib/discord/commands`
  if (!(await checkFileDirExists(fileDir))) {
    await mkdir(fileDir, { recursive: true })
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
