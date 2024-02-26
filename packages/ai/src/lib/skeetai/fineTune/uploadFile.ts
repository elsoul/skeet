import { AIType } from '@/lib/genPrompt'
import * as dotenv from 'dotenv'
import { OpenAI } from '@/lib/openai'
import { VertexAI } from '@/lib/vertexai'
dotenv.config()

export const uploadJsonlFile = async (
  filePath: string,
  thisAi: AIType,
  thisAiInstance: VertexAI | OpenAI,
) => {
  try {
    if (thisAi === 'VertexAI') {
      console.log(`Coming soon...`)
      return
    } else {
      const openai = thisAiInstance as OpenAI
      return await openai.uploadFile(filePath)
    }
  } catch (error) {
    throw new Error(`uploadFile: ${error}`)
  }
}
