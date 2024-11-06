import { Client, type Message } from '@discord/harmony'
import loadEnv from '@/lib/loadEnv.ts'

const { TOKEN } = loadEnv()

const client = new Client({
  intents: [
    'GUILDS',
    'DIRECT_MESSAGES',
    'GUILD_MESSAGES',
    'MESSAGE_CONTENT',
    'GUILD_MEMBERS',
    'GUILD_INTEGRATIONS',
  ],
  // token: optionally specify, otherwise DISCORD_TOKEN from env is used
})

// Listen for event when client is ready (Identified through gateway / Resumed)
client.on('ready', () => {
  console.log(`Ready! User: ${client.user?.tag}`)
})

// Listen for event whenever a Message is sent
client.on('messageCreate', (msg: Message): void => {
  if (msg.content === '!ping') {
    msg.channel.send(`Pong! WS Ping: ${client.gateway.ping}`)
  }
})

// Connect to gateway
client.connect(TOKEN)
