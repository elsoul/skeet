import { discordChangeLog } from '@skeet-framework/discord-utils'
import { dotenv } from '@skeet-framework/utils'
dotenv.config()

const REPO_NAME = 'elsoul/skeet-discord-utils'

const run = async () => {
  const token = process.env.DISCORD_TOKEN || ''
  const channelId = process.env.DISCORD_CHANNEL_ID || ''
  const channelIdJA = process.env.DISCORD_CHANNEL_ID_JA || ''
  const laboSkeetChannelId = process.env.LABO_SKEET_CHANNEL_ID || ''
  await discordChangeLog(token, REPO_NAME, [channelId])
  await discordChangeLog(token, REPO_NAME, [channelIdJA], 'ja')
  await discordChangeLog(token, REPO_NAME, [laboSkeetChannelId])
}

run()
