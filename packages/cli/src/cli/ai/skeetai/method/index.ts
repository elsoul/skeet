import { AIType, generatePrompt } from '@skeet-framework/ai'
import { typescriptMethodPrompt } from './prompt'

export const skeetMethod = async (
  content: string,
  aiType: AIType,
  tsconfig: string,
  packageJson: string,
  prettierrc: string,
  existingFunctions: string,
) => {
  try {
    const example = typescriptMethodPrompt(
      tsconfig,
      packageJson,
      prettierrc,
      existingFunctions,
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
