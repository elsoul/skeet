import { AIType, generatePrompt } from '@skeet-framework/ai'
import { firebaseFunctionPrompt } from './prompt'
import { SkeetInstanceType } from '@/types/skeetTypes'

export const skeetFunction = async (
  aiType: AIType,
  content: string,
  tsconfig: string,
  packageJson: string,
  prettierrc: string,
  existingFunctions: string,
  existingModels: string,
  instanceType: SkeetInstanceType,
) => {
  try {
    const example = firebaseFunctionPrompt(
      tsconfig,
      packageJson,
      prettierrc,
      existingFunctions,
      existingModels,
      instanceType,
    )
    const result = generatePrompt(
      aiType,
      example.context,
      example.examples,
      content,
    )
    return result
  } catch (error) {
    throw new Error(`skeetFunction: ${error}`)
  }
}
