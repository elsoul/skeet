export type VertexPromptParams = {
  context: string
  examples: VertexExample[]
  messages: VertexMessage[]
}

export type VertexExample = {
  input: VertexExampleMessage
  output?: VertexExampleMessage
}

export type VertexExampleMessage = {
  content: string
}

export type VertexMessage = {
  author: string
  content: string
}

export type VertexParameterParams = {
  temperature: number
  maxOutputTokens: number
  topP: number
  topK: number
}

export type VertexAiOptions = {
  projectId?: string
  location?: string
  apiEndpoint?: string
  model?: string
  publisher?: string
  temperature?: number
  maxOutputTokens?: number
  topP?: number
  topK?: number
  isJapanese?: boolean
  delay?: number
}
