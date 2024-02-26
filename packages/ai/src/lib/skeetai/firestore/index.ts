import { commonPrompt } from '../commonPrompt'
import { firestorePrompt } from './prompt'
import SkeetAI from '@/lib/skeetai'

export const skeetFirestore = async (content: string, skeetAi: SkeetAI) => {
  try {
    const example = firestorePrompt()
    const result = await commonPrompt(
      example,
      content,
      skeetAi.ai,
      skeetAi.aiInstance,
    )
    return result
  } catch (error) {
    throw new Error(`skeetNaming: ${error}`)
  }
}
