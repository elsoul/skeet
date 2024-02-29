export type SafetyRating = {
  category: string
  probability: number
  severity: number
}

export type Part = {
  text: string
}

export type Content = {
  role: string
  parts: Part[]
}

export type Candidate = {
  content: Content
  finishReason: string
  safetyRatings: SafetyRating[]
}

export type VertexAiResponse = {
  candidates: Candidate[]
}
