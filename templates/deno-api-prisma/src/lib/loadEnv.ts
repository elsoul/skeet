import '@std/dotenv/load'

export type Env = {
  DATABASE_URL: string
}

const requiredEnvKeys: (keyof Env)[] = [
  'DATABASE_URL',
]

function loadEnv(): Env {
  const env: Partial<Env> = {}

  for (const key of requiredEnvKeys) {
    const value = Deno.env.get(key)
    if (!value) {
      console.error(
        `Missing environment variable: ${key}. Please set it in your environment.`,
      )
      Deno.exit(1)
    }
    env[key] = value
  }

  return env as Env
}

export default loadEnv
