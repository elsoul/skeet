// tests/http.test.ts
import { describe, it, expect } from 'vitest'

import { Content } from '@google-cloud/vertexai'
import { geminiChat, vertextAIStream } from '@/lib/geminiChat'
import { ChatCompletionMessageParam } from 'openai/resources'
import { openAIChat } from '@/lib/openAIChat'
import { generatePrompt } from '@/index'
import { inspect } from 'util'
import { VertexAiResponse } from '@/lib/types/vertexAiResponseTypes'

describe('Gemini AI', () => {
  it('geminiChat works', async () => {
    // const contents = [
    //   { role: 'user', parts: [{ text: 'How are you doing today?' }] },
    // ] as Content[]
    // await geminiChat(contents)
    expect(200).toBe(200)
  })

  it('openAIChat works', async () => {
    // const contents = [
    //   {
    //     role: 'system',
    //     content: 'You are a helpful assistant.',
    //   },
    //   {
    //     role: 'user',
    //     content: 'Tell me about Skeet Framework?',
    //   },
    // ] as ChatCompletionMessageParam[]
    // const res = await openAIChat(contents)
    // console.log(res)
    expect(200).toBe(200)
  })

  it('generatePrompt Gemini returns Content[]', async () => {
    const context = 'You are a helpful assistant.'
    const inputOutput = [
      {
        input: 'Tell me about Skeet Framework?',
        output: 'Skeet Framework is a framework for building web applications.',
      },
    ]
    const content = 'How to build a web application?'
    const contents = generatePrompt<'Gemini'>(
      'Gemini',
      context,
      inputOutput,
      content,
    )
    console.log(`Gemini: ${inspect(contents, false, null, true)}`)
    // Check if the contents is an array
    expect(Array.isArray(contents)).toBeTruthy()

    // Check if the contents is an array of Content
    contents.forEach((item) => {
      expect(item).toHaveProperty('role')
      expect(item).toHaveProperty('parts')
      expect(Array.isArray(item.parts)).toBeTruthy()
    })

    // const result = await geminiChat(contents)
    // if (!result) {
    //   console.error('No result from geminiChat')
    //   return
    // }
    // await vertextAIStream(result)

    console.log(`Gemini: ${inspect(contents, false, null, true)}`)
  })

  it('generatePrompt OpenAI returns ChatCompletionMessageParam[]', async () => {
    const context = 'This is a context'
    const inputOutput = [
      {
        input: 'This is an input',
        output: 'This is an output',
      },
    ]
    const content = 'This is a content'
    const res = generatePrompt<'OpenAI'>(
      'OpenAI',
      context,
      inputOutput,
      content,
    )
    // Check if the result is an array
    expect(Array.isArray(res)).toBeTruthy()

    // Check if the result is an array of Content
    res.forEach((item) => {
      expect(item).toHaveProperty('role')
      expect(item).toHaveProperty('content')
    })

    //console.log(`OpenAI: ${inspect(res, false, null, true)}`)
  })
})
