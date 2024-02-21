import { createHash } from 'crypto'

/**
 * Generates a Gravatar icon URL for the given email address.
 *
 * @param email - The email address to generate the Gravatar icon URL for.
 * @returns The Gravatar icon URL.
 *
 * @example
 * const email = 'user@example.com';
 * const gravatarUrl = gravatarIconUrl(email);
 * console.log(gravatarUrl); // Gravatar icon URL
 */
export const gravatarIconUrl = (email: string): string => {
  try {
    const md5Hash = createHash('md5')
    const trimmedEmail = email.trim().toLowerCase()
    const hash = md5Hash.update(trimmedEmail).digest('hex')
    return `https://www.gravatar.com/avatar/${hash}?d=retro&s=256`
  } catch (error) {
    throw new Error(`gravatarIconUrl: ${error}`)
  }
}
