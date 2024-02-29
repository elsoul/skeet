import { v2 } from '@google-cloud/translate'
import { inspect } from 'util'

const googleTranslate: v2.Translate = new v2.Translate()

/**
 * Translates the provided text into the specified target language.
 *
 * @param text - The text to be translated.
 * @param target - The target language code for the translation (defaults to 'ja' for Japanese).
 * @returns A promise that resolves with the translated string.
 * @throws Will throw an error if the translation fails.
 *
 * @example
 * ```typescript
 * import { translate } from "@skeet-framework/ai"
 *
 * const translatedText = await translate("Hello", "es")
 * console.log(translatedText);  // Outputs: "Hola"
 * ```
 */
export const translate = async (
  text: string,
  target = 'ja',
): Promise<string> => {
  try {
    const result = await googleTranslate.translate(text, target)
    const translations: string[] = Array.isArray(result[0])
      ? result[0]
      : [result[0]]
    return translations[0]
  } catch (error) {
    throw new Error(`Error in translate: ${inspect(error)}`)
  }
}
