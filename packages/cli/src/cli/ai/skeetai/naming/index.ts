import {
  AIType,
  Example,
  NamingEnum,
  generatePrompt,
} from '@skeet-framework/ai'
import {
  migrationNamingPrompt,
  functionNamingPrompt,
  modelNamingPrompt,
} from './prompt'
export const skeetNaming = async (
  content: string,
  aiType: AIType,
  namingEnum: NamingEnum,
  functionNames = ['skeet'],
) => {
  try {
    let example: Example = { context: '', examples: [] }
    if (namingEnum === NamingEnum.MIGRATION) {
      example = migrationNamingPrompt
    } else if (namingEnum === NamingEnum.FUNCTION) {
      example = functionNamingPrompt(functionNames)
    } else if (namingEnum === NamingEnum.MODEL) {
      example = await modelNamingPrompt()
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
