import { REST, Routes } from 'discord.js'

/**
 * Adds a specified role to a user within a specific guild.
 *
 * @param guildId - The ID of the guild where the user and role are located.
 * @param userId - The ID of the user to whom the role will be added.
 * @param roleId - The ID of the role to be added to the user.
 * @returns A promise that resolves to void when the role is successfully added.
 * @throws Will throw an error if there is a problem adding the role.
 *
 * @example
 * ```typescript
 * const token = 'your_discord_token_here';
 * const guildId = 'your_guild_id_here';
 * const userId = 'your_user_id_here';
 * const roleId = 'your_role_id_here';
 *
 * const run = async () => {
 *   try {
 *     await addRoleToUser(token, guildId, userId, roleId);
 *     console.log('Role added successfully.');
 *   } catch (error) {
 *     console.error(`Error: ${error.message}`);
 *   }
 * }
 *
 * run();
 * ```
 */
export async function addRoleToUser(
  token: string,
  guildId: string,
  userId: string,
  roleId: string,
) {
  try {
    const rest = new REST({ version: '10' }).setToken(token)
    const route = Routes.guildMemberRole(guildId, userId, roleId)
    await rest.put(route)
    console.log(`Role ${roleId} added to user ${userId} in guild ${guildId}.`)
  } catch (error) {
    console.log(`addRoleToUser: ${error}`)
    throw new Error(`addRoleToUser: ${error}`)
  }
}
