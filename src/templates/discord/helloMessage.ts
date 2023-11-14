import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import { existsSync, mkdirSync } from 'fs'

export const helloMessage = () => {
  const fileDir = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/lib/discord/messages`
  if (!existsSync(fileDir)) {
    mkdirSync(fileDir, { recursive: true })
  }
  const filePath = `${fileDir}/helloMessage.ts`
  const body = `import {
  ButtonStyleTypes,
  MessageComponentTypes,
} from '@skeet-framework/discord-utils'

export const helloMessage = () => {
  const body = {
    content: 'hello world',
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
