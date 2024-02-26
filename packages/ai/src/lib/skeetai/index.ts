import { OpenAI } from '../openai'
import { VertexAI } from '../vertexai'
import {
  createFineTuningJob,
  showFineTuningJob,
  uploadJsonlFile,
} from './fineTune'
import { skeetAiPrisma } from './prisma'
import { skeetPrompt } from './skeet'
import * as dotenv from 'dotenv'
import { skeetGenTypedoc } from './typedoc'
import { skeetNaming } from './naming'
import { skeetAiTranslates } from './tranlsate'
import { Example, InstanceType, NamingEnum } from '../types/skeetaiTypes'
import { skeetFirestore } from './firestore'
import { generatePrompt } from '../genPrompt'
import { OpenAIPromptParams, VertexPromptParams } from '../types'
import { skeetMethod } from './method'
import { skeetFunction } from './function'
dotenv.config()

/**
 * Configuration options for initializing a SkeetAI instance.
 */
export interface SkeetAIOptions {
  /**
   * AI platform type (either 'VertexAI' or 'OpenAI'). Default is 'VertexAI'.
   */
  ai?: 'VertexAI' | 'OpenAI'

  /**
   * Model name to be used by the chosen AI platform. Defaults are 'chat-bison@001' for VertexAI and 'gpt-4' for OpenAI.
   */
  model?: string

  /**
   * Maximum number of tokens to be returned in the response. Default is 1000.
   */
  maxTokens?: number

  /**
   * Temperature parameter for the AI platform. Default is 0.2.
   * @see https://beta.openai.com/docs/api-reference/completions/create#temperature
   */
  temperature?: number
}

export interface AIPromptable {
  prompt(input: string): Promise<any>
}

/**
 * The main SkeetAI class for handling AI interactions.
 */
export class SkeetAI {
  ai: 'VertexAI' | 'OpenAI'
  model: string
  maxTokens: number
  temperature: number

  private _initOptions: SkeetAIOptions

  static readonly PRISMA_SCHEMA_PATH: string = './graphql/prisma/schema.prisma'
  static readonly MODEL_PATH: string = './common/models'
  static readonly FUNCTION_ROOT = './functions'
  aiInstance: VertexAI | OpenAI

  functionConfigPaths = (functionName: string) => {
    const paths = {
      packageJson: `${SkeetAI.FUNCTION_ROOT}/${functionName}/package.json`,
      tsconfigJson: `${SkeetAI.FUNCTION_ROOT}/${functionName}/tsconfig.json`,
    }
    return paths
  }

  /**
   * Creates an instance of SkeetAI.
   * @param options - Configuration options for initializing the SkeetAI.
   * @example
   * ```typescript
   * // Using default settings:
   * const defaultSkeet = new SkeetAI();
   *
   * // Specifying the AI platform and model:
   * const customSkeet = new SkeetAI({
   *   ai: 'OpenAI',
   *   model: 'gpt-4',
   *   maxTokens: 500
   * });
   * ```
   */
  constructor(options: SkeetAIOptions = {}) {
    this.ai = options.ai || 'VertexAI'
    this.model =
      options.model || (this.ai === 'VertexAI' ? 'chat-bison@001' : 'gpt-4')
    this.maxTokens = options.maxTokens || 1000
    this.temperature = options.temperature || 0

    if (this.ai === 'VertexAI') {
      this.aiInstance = new VertexAI({
        model: this.model,
        maxOutputTokens: this.maxTokens,
      })
    } else {
      this.aiInstance = new OpenAI({
        model: this.model,
        maxTokens: this.maxTokens,
        apiKey: process.env.CHAT_GPT_KEY || '',
        organizationKey: process.env.CHAT_GPT_ORG || '',
      })
    }
    this._initOptions = options
  }

  get initOptions(): SkeetAIOptions {
    return this._initOptions
  }

  async prisma(content: string) {
    try {
      return await skeetAiPrisma(content, this)
    } catch (error: any) {
      this.handleError(error)
    }
  }

  async skeet(content: string) {
    try {
      return await skeetPrompt(content, this)
    } catch (error: any) {
      throw new Error(`skeet: ${error}`)
    }
  }

  async uploadFile(filePath: string) {
    try {
      return await uploadJsonlFile(filePath, this.ai, this.aiInstance)
    } catch (error: any) {
      this.handleError(error)
    }
  }

  async createFineTuningJob(fileId: string, model = 'gpt-3.5-turbo-0613') {
    try {
      return await createFineTuningJob(fileId, model, this.ai, this.aiInstance)
    } catch (error) {
      this.handleError(error)
    }
  }

  async showFineTuningJob(jobId: string) {
    try {
      return await showFineTuningJob(jobId, this.ai, this.aiInstance)
    } catch (error) {
      this.handleError(error)
    }
  }

  async typedoc(content: string) {
    try {
      return await skeetGenTypedoc(content, this)
    } catch (error: any) {
      this.handleError(error)
    }
  }

  async naming(content: string, namingEnum = NamingEnum.FUNCTION) {
    try {
      return await skeetNaming(content, this, namingEnum)
    } catch (error: any) {
      this.handleError(error)
    }
  }

  async translates(paths: string[], langFrom = 'ja', langTo = 'en') {
    try {
      return await skeetAiTranslates(paths, langFrom, langTo, this)
    } catch (error: any) {
      this.handleError(error)
    }
  }

  async firestore(content: string) {
    try {
      return await skeetFirestore(content, this)
    } catch (error: any) {
      this.handleError(error)
    }
  }

  async function(
    content: string,
    tsconfig: string,
    packageJson: string,
    prettierrc: string,
    existingFunctions: string,
    existingModels: string,
    instanceType: InstanceType,
  ) {
    try {
      return await skeetFunction(
        content,
        this,
        tsconfig,
        packageJson,
        prettierrc,
        existingFunctions,
        existingModels,
        instanceType,
      )
    } catch (error: any) {
      this.handleError(error)
    }
  }

  async method(
    content: string,
    tsconfig: string,
    packageJson: string,
    prettierrc: string,
    existingFunctions: string,
    existingModels: string,
  ) {
    try {
      return await skeetMethod(
        content,
        this,
        tsconfig,
        packageJson,
        prettierrc,
        existingFunctions,
        existingModels,
      )
    } catch (error: any) {
      this.handleError(error)
    }
  }

  async run(example: Example, content: string) {
    try {
      const prompt = generatePrompt(
        example.context,
        example.examples,
        content,
        this.ai,
      )

      if (this.ai === 'VertexAI') {
        const aiInstance = this.aiInstance as VertexAI
        return await aiInstance.prompt(prompt as VertexPromptParams)
      } else {
        const aiInstance = this.aiInstance as OpenAI
        return await aiInstance.prompt(prompt as OpenAIPromptParams)
      }
    } catch (error) {
      throw new Error(`run: ${error}`)
    }
  }

  private handleError(error: any) {
    console.error('Error:', error)
  }
}

export default SkeetAI
