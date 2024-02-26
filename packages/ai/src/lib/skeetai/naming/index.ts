import {
  migrationNamingPrompt,
  functionNamingPrompt,
  modelNamingPrompt,
} from './prompt'
import { Example, NamingEnum } from '@/lib/types/skeetaiTypes'
import { commonPrompt } from '../commonPrompt'
import SkeetAI from '..'

export const skeetNaming = async (
  content: string,
  skeetAi: SkeetAI,
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
      example = modelNamingPrompt()
    }

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
