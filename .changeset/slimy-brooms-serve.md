---
'@skeet-framework/ai': patch
---

Add - Claude3 AI

```ts
import { chat } from '@skeet-framework/ai'

const examples = [
  { input: 'Who was the first person in space?', output: 'Yuri Gagarin' },
  { input: 'Tell me about the Apollo missions.', output: 'Gemini' },
]
const aiType = 'Claude'
const context = 'You are an helpful AI assistant'
const content = 'Hello, how are you?'
const result = await chat(context, examples, aiType, content)
```
