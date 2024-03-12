import { AIType, generatePrompt } from '@skeet-framework/ai'
import { firestorePrompt } from './prompt'

export const skeetFirestore = async (aiType: AIType, content: string) => {
  try {
    const example = await firestorePrompt()
    const result = generatePrompt(
      aiType,
      example.context,
      example.examples,
      content,
    )
    return result
  } catch (error) {
    throw new Error(`skeetFirestore: ${error}`)
  }
}
