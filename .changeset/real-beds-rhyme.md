---
'@skeet-framework/ai': patch
---

Add - chat

chat function can call Gemini and OpenAI with the same arguments, making it easy to compare the results of Gemini and OpenAI.

```ts
import { chat } from '@skeet-framework/ai'

const context = 'You are a helpful assistant.'
const examples = [
  {
    input: 'What is the capital of France?',
    output: 'The capital of France is Paris.',
  },
  {
    input: 'What is the capital of Spain?',
    output: 'The capital of Spain is Madrid.',
  },
  {
    input: 'What is the capital of Italy?',
    output: 'The capital of Italy is Rome.',
  },
]
const input = 'What is the capital of France?'

const gemini = await chat(context, examples, input, 'Gemini')
const openai = await chat(context, examples, input, 'OpenAI')
```
