import { REST, Routes, TextChannel } from 'discord.js'

/**
 * Creates a text channel within a guild with specified permissions.
 *
 * @param token - The token used for authentication with the Discord API.
 * @param guildId - The ID of the guild in which to create the channel.
 * @param channelName - The name of the channel to create.
 * @param memberId - The ID of the member for whom the channel is being created.
 * @returns A promise that resolves to the newly created TextChannel.
 * @throws Will throw an error if there is a problem creating the channel.
 *
 * @example
 * ```typescript
 * const token = 'your_discord_token_here';
 * const guildId = 'your_guild_id_here';
 * const channelName = 'text-channel';
 * const memberId = 'your_member_id_here';
 *
 * const channel = await createTextChannel(token, guildId, channelName, memberId)
 * console.log(`Channel created with ID: ${channel.id}`)
 * ```
 */
export async function createTextChannel(
  token: string,
  guildId: string,
  channelName: string,
  memberId: string,
): Promise<TextChannel> {
  try {
    const rest = new REST({ version: '10' }).setToken(token)
    const overwrites = [
      {
        id: guildId,
        deny: 68608,
        type: 0,
      },
      {
        id: memberId,
        allow: 68608,
        type: 1,
      },
    ]
    const channel = await rest.post(Routes.guildChannels(guildId), {
      body: {
        name: channelName,
        type: 0,
        permission_overwrites: overwrites,
      },
    })
    return channel as TextChannel
  } catch (error) {
    console.log(`createTextChannel: ${error}`)
    throw new Error(`createTextChannel: ${error}`)
  }
}
