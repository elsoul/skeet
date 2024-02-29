import { typescriptMethodPrompt } from './prompt'
import { AIType, generatePrompt } from '@/lib/genPrompt'

export const skeetMethod = async (
  content: string,
  aiType: AIType,
  tsconfig: string,
  packageJson: string,
  prettierrc: string,
  existingFunctions: string,
  existingModels: string,
) => {
  try {
    const example = typescriptMethodPrompt(
      tsconfig,
      packageJson,
      prettierrc,
      existingFunctions,
      existingModels,
    )
    const result = generatePrompt(
      aiType,
      example.context,
      example.examples,
      content,
    )
    return result
  } catch (error) {
    throw new Error(`skeetNaming: ${error}`)
  }
}
