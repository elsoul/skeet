import { debugPrompt } from './prompt'
import { readFileSync } from 'fs'
import { commonPrompt } from '../commonPrompt'
import SkeetAI from '..'

export const skeetDebug = async (
  content: string,
  debugFile: string,
  skeetAi: SkeetAI,
) => {
  try {
    const { packageJson, tsconfigJson } = skeetAi.functionConfigPaths('debug')

    const debugFileContent = readFileSync(debugFile, 'utf8')
    const example = debugPrompt(tsconfigJson, packageJson, debugFileContent)
    const result = await commonPrompt(
      example,
      content,
      skeetAi.ai,
      skeetAi.aiInstance,
    )
    return result
  } catch (error) {
    throw new Error(`skeetDebug: ${error}`)
  }
}
