import { REST, Routes } from 'discord.js'

/**
 * Defers the response to a Discord interaction, indicating that a future response will be sent.
 *
 * @param token - The token used for authentication with the Discord API.
 * @param interactionId - The ID of the interaction to defer.
 * @param interactionToken - The token of the interaction to defer.
 * @param content - Optional content to include in the deferred response. Defaults to 'Processing...'.
 * @returns A promise that resolves to a boolean indicating whether the defer operation was successful.
 * @throws Will throw an error if there is a problem deferring the response.
 *
 * @example
 * ```typescript
 * const token = 'your_discord_token_here';
 * const interactionId = 'your_interaction_id_here';
 * const interactionToken = 'your_interaction_token_here';
 * const content = 'Please wait...';
 *
 * deferResponse(token, interactionId, interactionToken, content)
 *   .then(success => {
 *     if (success) {
 *       console.log('Response deferred successfully.');
 *     } else {
 *       console.log('Failed to defer the response.');
 *     }
 *   })
 *   .catch(error => console.error(`Error: ${error.message}`));
 * ```
 */
export async function deferResponse(
  token: string,
  interactionId: string,
  interactionToken: string,
  content?: string,
) {
  try {
    const rest = new REST({ version: '10' }).setToken(token)
    const route = Routes.interactionCallback(interactionId, interactionToken)
    await rest.post(route, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        type: 5,
        data: {
          content: content || 'Processing...',
          flags: 64,
        },
      },
    })
    return true
  } catch (error) {
    console.log(`deferResponse: ${error}`)
    throw new Error(`deferResponse: ${error}`)
  }
}
