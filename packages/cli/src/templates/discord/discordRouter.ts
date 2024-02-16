import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'

export const discordRouter = () => {
  const filePath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/routings/http/discordRouter.ts`
  const body = `import { onRequest } from 'firebase-functions/v2/https'
import { publicHttpOption } from '@/routings/options'
import { TypedRequestBody } from '@/types/http'
import { db } from '@/index'
import { defineSecret } from 'firebase-functions/params'
import {
  ActionData,
  CommandData,
  DiscordRouterParams,
  InteractionType,
  verifyKey,
} from '@skeet-framework/discord-utils'
import { helloAction } from '@/lib/discord/actions/helloAction'
import { DISCORD_PUBKEY } from '@/lib/config'

// Please \`skeet add secret\` to add your secret
// e.g. skeet add secret DISCORD_TOKEN
const DISCORD_TOKEN = defineSecret('DISCORD_TOKEN')

export const discordRouter = onRequest(
  {
    ...publicHttpOption,
    secrets: [DISCORD_TOKEN],
  },
  async (req: TypedRequestBody<DiscordRouterParams>, res) => {
    try {
      const signature = req.get('X-Signature-Ed25519') || ''
      const timestamp = req.get('X-Signature-Timestamp') || ''
      const isValidRequest = verifyKey(
        req.rawBody,
        signature,
        timestamp,
        DISCORD_PUBKEY,
      )
      if (!isValidRequest) {
        res.status(401).end('Bad request signature')
        return
      }
      // Discord Interaction Webhook
      // Please refer to https://discord.com/developers/docs/interactions/application-commands
      if (req.body.type === InteractionType.PING) {
        // To verify the request
        res.send({
          type: InteractionType.PING,
        })
      } else if (req.body.type === InteractionType.APPLICATION_COMMAND) {
        // Slash command
        const options = req.body.data as CommandData
        if (options.name.match(/^hello$/)) {
          await helloAction(res, db, DISCORD_TOKEN.value(), req.body)
        }
      } else {
        // Button action
        const { custom_id } = req.body.data as ActionData
        if (custom_id.match(/^hello-button$/)) {
          await helloAction(res, db, DISCORD_TOKEN.value(), req.body)
        }
      }
    } catch (error) {
      console.log(\`discordRouter: \${error}\`)
      res.status(500).json({ status: 'error', message: String(error) })
    }
  },
)`
  return {
    filePath,
    body,
  }
}
