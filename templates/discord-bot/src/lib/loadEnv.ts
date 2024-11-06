import 'jsr:@std/dotenv/load'

export type Env = {
  TOKEN: string
}

function loadEnv() {
  const TOKEN = Deno.env.get('DISCORD_TOKEN') || ''
  if (TOKEN === '') {
    console.error(`⚠️ Missing Discord token
      Please set the environment variable DISCORD_TOKEN in .env file`)
    Deno.exit(1)
  }

  return { TOKEN } as Env
}

export default loadEnv
