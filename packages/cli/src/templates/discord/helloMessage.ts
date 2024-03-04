import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { mkdir } from 'fs/promises'

export const helloMessage = async () => {
  const fileDir = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/lib/discord/messages`
  if (!(await checkFileDirExists(fileDir))) {
    await mkdir(fileDir, { recursive: true })
  }
  const filePath = `${fileDir}/helloMessage.ts`
  const body = `import {
  ButtonStyleTypes,
  MessageComponentTypes,
} from '@skeet-framework/discord-utils'

export const helloMessage = () => {
  const body = {
    content: 'hello button',
    components: [
      {
        type: MessageComponentTypes.ACTION_ROW,
        components: [
          {
            type: MessageComponentTypes.BUTTON,
            style: ButtonStyleTypes.PRIMARY,
            label: 'Hello Button',
            custom_id: 'hello-button',
          },
        ],
      },
    ],
  }
  return body
}`
  return {
    filePath,
    body,
  }
}
