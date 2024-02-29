import {
  VertexAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerationConfig,
  Content,
  StreamGenerateContentResult,
} from '@google-cloud/vertexai'
import type { VertexAiResponse } from '@/lib/types/vertexAiResponseTypes'
import dotenv from 'dotenv'
dotenv.config()

const project = process.env.GCP_PROJECT_ID || ''
const location = process.env.GCP_LOCATION || ''

export interface ConfigGeminiType extends GenerationConfig {
  model: string
  project: string
  location: string
}

export type GeminiModel = 'gemini-pro' | 'gemini-pro-vision'

export const defaultGeminiConfig: ConfigGeminiType = {
  project,
  location,
  max_output_tokens: 256,
  temperature: 0.1,
  top_p: 1,
  top_k: 40,
  model: 'gemini-pro' as GeminiModel,
}

export const geminiChat = async (
  contents: Content[],
  config = defaultGeminiConfig,
) => {
  try {
    if (config.project === '' || config.location === '') {
      console.error(
        'GCP_PROJECT_ID and GCP_LOCATION are required in .env file.\n\nor you can pass them as arguments to the function.',
      )
      return
    }
    const { model, project, location, ...generation_config } = config
    const vertex_ai = new VertexAI({
      project,
      location,
    })

    // Instantiate models
    const generativeModel = vertex_ai.getGenerativeModel({
      model,
      safety_settings: [
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
      generation_config,
    })

    const request = {
      contents,
    }
    const streamingResp = await generativeModel.generateContentStream(request)
    return streamingResp
  } catch (error) {
    throw new Error(`Error in geminiChat: ${error}`)
  }
}

export const vertextAIStream = async (
  streamingResp: StreamGenerateContentResult,
) => {
  for await (const item of streamingResp.stream) {
    const text = JSON.parse(JSON.stringify(item)) as unknown as VertexAiResponse
    console.log(text.candidates[0].content.parts[0].text)
  }
  const response = JSON.parse(
    JSON.stringify(await streamingResp.response),
  ) as unknown as VertexAiResponse
  return response
}
