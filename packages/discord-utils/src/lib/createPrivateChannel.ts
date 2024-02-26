import { isChannelExist } from './isChannelExist'
import { createTextChannel } from './createTextChannel'

/**
 * Creates a private channel within a guild if a channel with the specified name does not already exist.
 *
 * @param token - The token used for authentication with the Discord API.
 * @param guildId - The ID of the guild in which to create the channel.
 * @param channelName - The name of the channel to create.
 * @param memberId - The ID of the member for whom the channel is being created.
 * @returns A promise that resolves to the newly created TextChannel, or null if a channel with the specified name already exists.
 * @throws Will throw an error if there is a problem creating the channel.
 *
 * @example
 * ```typescript
 * const token = 'your_discord_token_here';
 * const guildId = 'your_guild_id_here';
 * const channelName = 'private-channel';
 * const memberId = 'your_member_id_here';
 *
 * const channel = await createPrivateChannel(token, guildId, channelName, memberId)
 *
 * if (channel) {
 *   console.log(`Channel created with ID: ${channel.id}`);
 * } else {
 *   console.log('Channel already exists.');
 * }
 * ```
 */
export const createPrivateChannel = async (
  token: string,
  guildId: string,
  channelName: string,
  memberId: string,
) => {
  try {
    const rmDotChannelName = channelName.replace('.', '')
    if (await isChannelExist(token, guildId, rmDotChannelName)) {
      return null
    }
    const res = await createTextChannel(token, guildId, channelName, memberId)
    console.log({ res })

    return res
  } catch (error) {
    throw new Error(`genChannel: ${error}`)
  }
}
