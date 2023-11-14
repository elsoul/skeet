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
  deferResponse,
  updateResponse,
} from '@skeet-framework/discord-utils'
import { Response } from 'firebase-functions/v1'
import { inspect } from 'util'

export const helloAction = async (
  res: Response,
  db: FirebaseFirestore.Firestore,
  discordToken: string,
  body: DiscordRouterParams,
) => {
  console.log('helloAction')
  console.log(inspect(body))
  await deferResponse(discordToken, body.id, body.token)
  // define your logic here
  await updateResponse(discordToken, body.application_id, body.token, {
    content: 'hello response!',
    flags: 64,
  })
  return true
}`
  return {
    filePath,
    body,
  }
}
