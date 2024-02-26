import { REST, Routes } from 'discord.js'

/**
 *
 * @param token - The token used for authentication with the Discord API.
 * @param channelId - The ID of the channel to delete.
 * @returns A promise that resolves to void when the channel is successfully deleted.
 * @throws Will throw an error if there is a problem deleting the channel.
 *
 * @example
 * ```typescript
 * const token = 'your_discord_token_here'
 * const channelId = 'your_channel_id_here'
 *
 * const run = async () => {
 *   try {
 *     await deleteChannel(token, channelId)
 *     console.log('Channel deleted successfully.')
 *   } catch (error) {
 *     console.error(`Error: ${error.message}`)
 *   }
 * }
 *
 * run()
 * ```
 */
export async function deleteChannel(
  token: string,
  channelId: string,
): Promise<void> {
  try {
    const rest = new REST({ version: '10' }).setToken(token)
    await rest.delete(Routes.channel(channelId))
  } catch (error) {
    console.log(`deleteChannel: ${error}`)
    throw new Error(`deleteChannel: ${error}`)
  }
}
