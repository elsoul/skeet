import { REST, Routes } from 'discord.js'

/**
 * Retrieves the roles of a user in a specific guild.
 *
 * @param token - The token used for authentication with the Discord API.
 * @param guildId - The ID of the guild from which to retrieve the user's roles.
 * @param userId - The ID of the user whose roles are to be retrieved.
 * @returns A promise that resolves to an array of role IDs.
 * @throws Will throw an error if there is a problem retrieving the user's roles.
 *
 * @example
 * const token = 'your_discord_token_here';
 * const guildId = 'your_guild_id_here';
 * const userId = 'your_user_id_here';
 *
 * const run = async () => {
 *   try {
 *     const roles = await getUserRoles(token, guildId, userId);
 *     console.log('User roles:', roles);
 *   } catch (error) {
 *     console.error(`Error: ${error.message}`);
 *   }
 * }
 *
 * run();
 */
export const getUserRoles = async (
  token: string,
  guildId: string,
  userId: string,
): Promise<string[]> => {
  try {
    const rest = new REST({ version: '10' }).setToken(token)
    const route = Routes.guildMember(guildId, userId)
    const user = (await rest.get(route)) as { roles: string[] }

    return user.roles as string[]
  } catch (error) {
    throw new Error(`getUserRoles: ${error}`)
  }
}
