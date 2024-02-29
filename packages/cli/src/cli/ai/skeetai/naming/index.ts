import { AIType, generatePrompt } from '@/lib/genPrompt'
import {
  migrationNamingPrompt,
  functionNamingPrompt,
  modelNamingPrompt,
} from './prompt'
import { Example, NamingEnum } from '@/lib/types/skeetaiTypes'
export const skeetNaming = async (
  content: string,
  aiType: AIType,
  namingEnum: NamingEnum,
  modelPath: string,
  functionNames = ['skeet'],
) => {
  try {
    let example: Example = { context: '', examples: [] }
    if (namingEnum === NamingEnum.MIGRATION) {
      example = migrationNamingPrompt
    } else if (namingEnum === NamingEnum.FUNCTION) {
      example = functionNamingPrompt(functionNames)
    } else if (namingEnum === NamingEnum.MODEL) {
      example = await modelNamingPrompt(modelPath)
    }

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
