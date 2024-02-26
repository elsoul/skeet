/**
 * `VertexAI` provides an interface to interact with Google's Vertex AI service.
 * This class simplifies the process of making predictions using Vertex AI, allowing
 * for easy configuration and prediction.
 *
 * Usage:
 * ```typescript
 * const vertexService = new VertexAI({
 *   projectId: 'your-project-id',
 *   location: 'your-location',
 *   // ... other options
 * });
 *
 * const prompt = {
 *   //... your prompt data
 * };
 *
 * const response = await vertexService.predict(prompt);
 * console.log(response);
 * ```
 *
 * @remarks
 * Make sure to set the appropriate environment variables or pass them as options to the constructor.
 *
 * @class
 * @example
 * VertexAI
 * ```typescript
 * import { VertexAI } from '@skeet-framework/ai'
 *
 * const vertexAi = new VertexAI()
 * const result = await vertexAi.chat('Hello')
 * console.log(result)
 * ```
 *
 * OpenAI
 * ```typescript
 * import { OpenAI } from '@skeet-framework/ai'
 *
 * const openAi = new OpenAI()
 * const result = await openAi.chat('Hello')
 * console.log(result)
 * ```
 */

import * as aiplatform from '@google-cloud/aiplatform'
import * as dotenv from 'dotenv'
import { inspect } from 'util'
import {
  VertexAiOptions,
  VertexParameterParams,
  VertexPromptParams,
} from '../types/vertexaiTypes'
import { randomChat } from './randomChat'
import { promptTitleGenerationEn, promptTitleGenerationJa } from './genTitle'
import { AIPromptable } from '@/lib/skeetai'
import { ReadStream } from 'fs'
import { Stream } from 'stream'

dotenv.config()

const { PredictionServiceClient } = aiplatform.v1

export class VertexAI implements AIPromptable {
  protected options: VertexAiOptions
  protected vertexParams: VertexParameterParams

  constructor(options: VertexAiOptions = {}) {
    this.options = this.initializeOptions(options)
    this.vertexParams = this.initializeVertexParams(options)
  }

  private initializeOptions(options: VertexAiOptions): VertexAiOptions {
    return {
      projectId: options.projectId || process.env.GCLOUD_PROJECT || '',
      location: options.location || process.env.REGION || '',
      apiEndpoint:
        options.apiEndpoint || 'us-central1-aiplatform.googleapis.com',
      model: options.model || 'chat-bison-32k',
      publisher: options.publisher || 'google',
      delay: options.delay || 200,
    }
  }

  private initializeVertexParams(
    options: VertexAiOptions,
  ): VertexParameterParams {
    return {
      temperature: options.temperature || 0,
      maxOutputTokens: options.maxOutputTokens || 256,
      topP: options.topP || 0.95,
      topK: options.topK || 40,
    }
  }

  private getEndpoint(): string {
    return `projects/${this.options.projectId}/locations/${this.options.location}/publishers/${this.options.publisher}/models/${this.options.model}`
  }

  async prompt(prompt: any): Promise<string> {
    try {
      this.validateOptions()

      const predictionServiceClient: any = new PredictionServiceClient({
        apiEndpoint: this.options.apiEndpoint,
      })

      const { endpoint, instanceValue, parameters } =
        await this.preparePredictRequest(prompt)

      const [response] = await predictionServiceClient.predict({
        endpoint,
        instances: [instanceValue],
        parameters,
      })

      return this.processPredictions(response)
    } catch (error: any) {
      this.handleError(error)
    }
  }

  async promptStream(prompt: any) {
    try {
      this.validateOptions()

      const predictionServiceClient: any = new PredictionServiceClient({
        apiEndpoint: this.options.apiEndpoint,
      })

      const { endpoint, instanceValue, parameters } =
        await this.preparePredictRequest(prompt)

      const [response] = await predictionServiceClient.predict({
        endpoint,
        instances: [instanceValue],
        parameters,
      })

      const result = await this.processPredictions(response)
      const stream = ReadStream.from(result)
      return stream
    } catch (error: any) {
      this.handleError(error)
    }
  }

  async chat(content: string): Promise<string> {
    try {
      const prompt = randomChat(content)
      const response = await this.prompt(prompt)
      return response
    } catch (error: any) {
      this.handleError(error)
    }
  }

  private validateOptions(): void {
    if (!this.options.projectId) {
      console.log(
        '⚠️ Please set projectId in options parameter or GCLOUD_PROJECT in your environment ⚠️',
      )
      return
    }
    if (!this.options.location) {
      console.log(
        '⚠️ Please set location in options parameter or REGION in your environment ⚠️',
      )
      return
    }
  }

  private async preparePredictRequest(prompt: VertexPromptParams) {
    const endpoint = this.getEndpoint()
    const instanceValue: any = aiplatform.helpers.toValue(prompt)
    const parameters: any = aiplatform.helpers.toValue(this.vertexParams)

    return { endpoint, instanceValue, parameters }
  }

  private async processPredictions(response: any) {
    const rawPrediction =
      response.predictions[0].structValue.fields.candidates.listValue.values[0]
        .structValue.fields.content.stringValue
    return String(rawPrediction)
  }

  async generateTitlePrompt(content: string, isJapanese = false) {
    const res: VertexPromptParams = isJapanese
      ? promptTitleGenerationJa(content)
      : promptTitleGenerationEn(content)
    return res
  }

  private handleError(error: any): never {
    if (
      typeof error === 'object' &&
      String(error.details).includes('Permission')
    ) {
      console.log(`⚠️ Make sure if you login to your GCP project.`)
    }
    throw new Error(`Error in vertexAi: ${inspect(error)}`)
  }
}
