import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import { existsSync, mkdirSync } from 'fs'

export const helloAction = () => {
  const fileDir = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/lib/discord/actions`
  if (!existsSync(fileDir)) {
    mkdirSync(fileDir, { recursive: true })
  }
  const filePath = `${fileDir}/helloAction.ts`
  const body = `import {
  DiscordRouterParams,
  InteractionResponseType,
} from '@skeet-framework/discord-utils'
import { Response } from 'firebase-functions/v1'

export const helloAction = async (
  res: Response,
  db: FirebaseFirestore.Firestore,
  discordToken: string,
  body: DiscordRouterParams,
) => {
  console.log('helloAction')
  res.send({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
  })
  return true
}`
  return {
    filePath,
    body,
  }
}
