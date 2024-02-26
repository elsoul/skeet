import { REST, Routes } from 'discord.js'

/**
 * Updates a previous response to a Discord interaction.
 *
 * @param token - The token used for authentication with the Discord API.
 * @param applicationId - The application ID associated with the interaction.
 * @param interactionToken - The token of the interaction to update.
 * @param data - The updated data to send as the response.
 * @returns A promise that resolves to true when the response is successfully updated.
 * @throws Will throw an error if there is a problem updating the response.
 *
 * @example
 * const token = 'your_discord_token_here';
 * const applicationId = 'your_application_id_here';
 * const interactionToken = 'your_interaction_token_here';
 * const data = {
 *   content: 'Updated response!',
 * };
 *
 * const run = async () => {
 *   try {
 *     const success = await updateResponse(token, applicationId, interactionToken, data);
 *     if (success) {
 *       console.log('Response updated successfully.');
 *     } else {
 *       console.log('Failed to update the response.');
 *     }
 *   } catch (error) {
 *     console.error(`Error: ${error.message}`);
 *   }
 * }
 *
 * run();
 */
export async function updateResponse(
  token: string,
  applicationId: string,
  interactionToken: string,
  data: object,
) {
  try {
    const rest = new REST({ version: '10' }).setToken(token)
    const route = Routes.webhookMessage(applicationId, interactionToken)
    await rest.patch(route, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        type: 6,
        ...data,
      },
    })
    return true
  } catch (error) {
    console.log(`updateResponse: ${error}`)
    throw new Error(`updateResponse: ${error}`)
  }
}
