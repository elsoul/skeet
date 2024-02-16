import { discordChangeLog } from '@skeet-framework/discord-utils'
import { dotenv } from '@skeet-framework/utils'
dotenv.config()

const REPO_NAME = 'elsoul/skeet-cli'

const run = async (project: 'labo' | 'epics') => {
  if (project === 'labo') {
    console.log('labo')
    const token = process.env.DISCORD_TOKEN_LABO || ''
    const channelId = process.env.LABO_SKEET_CHANNEL_ID || ''
    await discordChangeLog(token, REPO_NAME, [channelId])
  } else if (project === 'epics') {
    console.log('epics')
    const token = process.env.DISCORD_TOKEN || ''
    const channelId = process.env.DISCORD_CHANNEL_ID || ''
    const channelIdJA = process.env.DISCORD_CHANNEL_ID_JA || ''
    await discordChangeLog(token, REPO_NAME, [channelId])
    await discordChangeLog(token, REPO_NAME, [channelIdJA], 'ja')
  } else {
    console.log('invalid project name')
  }
}

const project = process.argv[2] as 'labo' | 'epics'
run(project)
