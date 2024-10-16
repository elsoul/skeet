import { Client, Events, GatewayIntentBits } from 'npm:discord.js'
import loadEnv from '@/lib/loadEnv.ts'

const { TOKEN } = loadEnv()

const main = async () => {
  try {
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMessagePolls,
      ],
    })
    client.on(Events.GuildMemberAdd, (member) => {
      console.log({ member })
      console.log(`New user joined: ${member.id}`)
    })

    client.on(Events.GuildMemberRemove, (member) => {
      console.log(`User left: ${member.id}`)
    })

    // When the client is ready, run this code
    client.once(Events.ClientReady, () => {
      const user = client.user?.tag
      console.log(`Logged in as ${user}!`)
    })

    client.on(Events.MessageCreate, (message) => {
      console.log('Message received:', message.content)
    })

    await client.login(TOKEN)
  } catch (error) {
    throw new Error(`Error in Discord Bot: ${error}`)
  }
}

main()
