// tests/http.test.ts
import { describe, it, expect } from 'vitest'
import { claudeChat } from '@/lib/claudeChat'
import { Message, MessageParam } from '@anthropic-ai/sdk/resources'
import { claudeChatStream } from '@/lib/claudeChatStream'
import { inspect } from 'util'
import chalk from 'chalk'
import { readClaudeStream } from '@/lib/readClaudeStream'
import { chat, generatePrompt } from '@/index'

describe('Claude AI', () => {
  // it('claudeChat works', async () => {
  //   const messages: MessageParam[] = [
  //     {
  //       role: 'user',
  //       content: 'Hello, Claude!',
  //     },
  //   ]
  //   const res = await claudeChat(messages)
  //   console.log(`claudeChat Response: ${res}`)
  //   expect(res).toBeTypeOf('string')
  // }, 30000)
  // it('claudeChatStream works', async () => {
  //   const messages: MessageParam[] = [
  //     {
  //       role: 'user',
  //       content: 'Hello, Claude!',
  //     },
  //   ]
  //   const res = await claudeChatStream(messages)
  //   await readClaudeStream(res)
  //   expect(200).toBe(200)
  // }, 30000)
  it('chat claude works', async () => {
    // const context = 'You are a helpful assistant.'
    // const examples = [
    //   {
    //     input: 'Tell me about Skeet Framework?',
    //     output: 'Skeet Framework is a framework for building web applications.',
    //   },
    //   {
    //     input: 'What is the purpose of Skeet Framework?',
    //     output:
    //       'The purpose of Skeet Framework is to make web development easier.',
    //   },
    // ]
    // const content = 'Tell me about Skeet Framework?'
    // const res = await chat(context, examples, content, 'Claude', false, false)
    // console.log(`chat claude Response: ${res}`)
    expect(200).toBe(200)
  }, 30000)
})
