import { REST, Routes } from 'discord.js'
import { SlashCommandBuilder } from 'discord.js'
/**
 * Deploys application commands to a specific guild.
 *
 * This function authenticates with the Discord API using the provided token,
 * then deploys the specified commands to the given guild.
 *
 * @param {string} token - The token used for authentication with the Discord API.
 * @param {string} discordClientId - The Discord client ID.
 * @param {string} guildId - The ID of the guild where commands are being deployed.
 * @param { SlashCommandBuilder[]} commands - An array of  SlashCommandBuilder representing the commands to be deployed.
 * @returns {Promise<void>} A promise that resolves when commands are successfully deployed.
 * @throws {Error} Will throw an error if there is a problem with the deployment.
 *
 * @example
 * ```typescript
 * import { commands } from "./commands";
 * import { deployCommands } from "@skeet-framework/discord-utils";
 * import { DISCORD_APPLICATION_ID, DISCORD_GUILD_ID } from "../config";
 *
 * const commandsData = Object.values(commands).map((command) => command.data);
 *
 * const run = async () => {
 *   const token = process.argv[2] || '';
 *   try {
 *     await deployCommands(token, DISCORD_APPLICATION_ID, DISCORD_GUILD_ID, commandsData);
 *     console.log('Commands deployed successfully.');
 *   } catch (error) {
 *     console.error(`Error deploying commands: ${error}`);
 *   }
 * };
 *
 * run()
 *   .then(() => console.log('Done'))
 *   .catch((error) => console.error(error));
 * ```
 */

export async function deployCommands(
  token: string,
  discordClientId: string,
  guildId: string,
  commands: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>[],
): Promise<void> {
  try {
    console.log('Started refreshing application (/) commands.')
    const rest = new REST({ version: '10' }).setToken(token)
    await rest.put(Routes.applicationGuildCommands(discordClientId, guildId), {
      body: commands,
    })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(`deployCommands: ${error}`)
    throw new Error(`deployCommands: ${error}`)
  }
}
