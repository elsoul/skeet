import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
dotenv.config()

/**
 * Options for sending a message to Discord.
 */
export type DiscordOptions = {
  /** The Discord webhook URL. */
  webhookUrl?: string

  /** The username that will be displayed when sending the message. */
  username?: string
}

/**
 * Sends a message to a Discord channel using a webhook.
 *
 * @param content - The content of the message to be sent.
 * @param options - Configuration options for sending the message.
 * @returns A promise that resolves to `true` if the message was sent successfully, or `false` otherwise.
 *
 * @example
 * ```typescript
 * sendDiscord('Hello from Skeet Notifier', {
 *   webhookUrl: 'YOUR_DISCORD_WEBHOOK_URL',
 *   username: 'CustomUsername'
 * });
 *
 * // Or you can set the webhook url in .env
 * process.env.DISCORD_WEBHOOK_URL = 'your webhook url'
 * sendDiscord('Hello from Skeet Notifier')
 * ```
 * **options overrides process.env.DISCORD_WEBHOOK_URL**
 */
export const sendDiscord = async (
  content: string,
  options: DiscordOptions = {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL,
    username: 'Skeet Notifier',
  },
): Promise<boolean> => {
  try {
    const discordOptions: DiscordOptions = {
      webhookUrl: options.webhookUrl || process.env.DISCORD_WEBHOOK_URL,
      username: options.username || 'Skeet Notifier',
    }

    if (!discordOptions.webhookUrl) {
      throw new Error(
        'DISCORD_WEBHOOK_URL is empty\nPlease set DISCORD_WEBHOOK_URL in .env',
      )
    }

    const body = {
      content,
      username: discordOptions.username,
    }
    const res = await fetch(discordOptions.webhookUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.status !== 204) return false
    return true
  } catch (e) {
    console.log({ error: `Skeet sendDiscord Error - ${content}` })
    return false
  }
}
