import dotenv from 'dotenv'
dotenv.config()

const NODE_ENV = process.env.NODE_ENV || 'development'

// Define Constants in one place
// e.g. Discord Constants
export const DISCORD_APPLICATION_ID = ''
export const DISCORD_PUBKEY = ''
export const DISCORD_GUILD_ID = ''

export const config = {
  NODE_ENV,
}
