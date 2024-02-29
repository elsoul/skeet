import { AIType, generatePrompt } from '@/lib/genPrompt'
import { markdownTranslatePrompt, jsonTranslatePrompt } from './prompt'

export const translateDocument = async (
  aiType: AIType,
  content: string,
  mode: 'markdown' | 'json',
  langFrom = 'ja',
  langTo = 'en',
) => {
  try {
    const example =
      mode === 'markdown'
        ? markdownTranslatePrompt(langFrom, langTo)
        : jsonTranslatePrompt(langFrom, langTo)

    const result = generatePrompt(
      aiType,
      example.context,
      example.examples,
      content,
    )
    return result
  } catch (error) {
    throw new Error(`skeetDocument: ${error}`)
  }
}
