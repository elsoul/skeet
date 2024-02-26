import { InstanceType } from '@/lib/types/skeetaiTypes'
import SkeetAI from '..'
import { commonPrompt } from '../commonPrompt'
import { firebaseFunctionPrompt } from './prompt'

export const skeetFunction = async (
  content: string,
  skeetAi: SkeetAI,
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
