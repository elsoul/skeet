import { InstanceType } from '@/lib/types/skeetaiTypes'
import { firebaseFunctionPrompt } from './prompt'
import { AIType, generatePrompt } from '@/lib/genPrompt'

export const skeetFunction = async (
  aiType: AIType,
  content: string,
  tsconfig: string,
  packageJson: string,
  prettierrc: string,
  existingFunctions: string,
  existingModels: string,
  instanceType: InstanceType,
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
