import { REST, Routes } from 'discord.js'
import { GuildMember } from 'src/types/DiscordUser'

/**
 * Retrieves a list of guild members from a Discord server.
 *
 * @param token - The authorization token for the Discord API.
 * @param guildId - The ID of the Discord guild (server).
 * @param limit - The maximum number of members to retrieve (default is 1000).
 * @param after - The ID of the last member received in the previous request, used for pagination.
 * @returns An array of `GuildMember` objects representing the members of the guild.
 * @throws Will throw an error if the REST call fails.
 *
 * @example
 * ```typescript
 * import dotenv from 'dotenv'
 * import { getGuildMembers } from './path-to-this-file'
 * dotenv.config()
 *
 * const token = process.env.DISCORD_TOKEN as string
 * const guildId = process.env.DISCORD_GUILD_ID as string
 *
 * const run = async () => {
 *   try {
 *     const members = await getGuildMembers(token, guildId)
 *     console.log(`Retrieved ${members.length} members`)
 *   } catch (error) {
 *     console.error(error)
 *   }
 * }
 *
 * void run()
 * ```
 */
export const getGuildMembers = async (
  token: string,
  guildId: string,
  limit = 1000,
  after?: string,
): Promise<GuildMember[]> => {
  try {
    const rest = new REST({ version: '10' }).setToken(token)
    const route = Routes.guildMembers(guildId)
    let paramsString = `limit=${limit}`
    if (after) {
      paramsString += `&after=${after}`
    }
    const query = new URLSearchParams(paramsString)
    const users = (await rest.get(route, { query })) as GuildMember[]

    return users
  } catch (error) {
    throw new Error(`getGuildMembers: ${error}`)
  }
}
