import { Message, REST, Routes } from 'discord.js'

/**
 * Sends a message to a specified channel in Discord.
 *
 * @param token - The token used for authentication with the Discord API.
 * @param channelId - The ID of the channel to which the message will be sent.
 * @param body - The content of the message to be sent.
 * @returns A promise that resolves to the sent Message object.
 * @throws Will throw an error if there is a problem sending the message.
 *
 * @example
 * const token = 'your_discord_token_here';
 * const channelId = 'your_channel_id_here';
 * const body = {
 *   content: 'Hello, world!',
 * };
 *
 * const run = async () => {
 *   try {
 *     const message = await messageChannel(token, channelId, body);
 *     console.log(`Message sent with ID: ${message.id}`);
 *   } catch (error) {
 *     console.error(`Error: ${error.message}`);
 *   }
 * }
 *
 * run();
 */
export async function messageChannel(
  token: string,
  channelId: string,
  body: any,
) {
  try {
    const rest = new REST({ version: '10' }).setToken(token)
    const result = await rest.post(Routes.channelMessages(channelId), {
      body,
    })
    return result as Message
  } catch (error) {
    throw new Error(`messageChannel: ${error}`)
  }
}
