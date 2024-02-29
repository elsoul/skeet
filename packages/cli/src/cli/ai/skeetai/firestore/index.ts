import { AIType, generatePrompt } from '@/lib/genPrompt'
import { firestorePrompt } from './prompt'

export const skeetFirestore = async (
  aiType: AIType,
  content: string,
  modelPath: string,
) => {
  try {
    const example = await firestorePrompt(modelPath)
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
