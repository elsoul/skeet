---
  id: skeet-ai-basic
  title: Skeet AI Mode
  description: skeet ai mode
---

Skeet Framework has AI-powered features.
Skeet AI enables AI debugging and AI code generation.
（_At the moment, we recommend using the OpenAI model gpt4._）

## Skeet AI YouTube - 1/7. Basic Usage (Video)

https://www.youtube.com/watch?v=e7J5HDhtpE4

## Skeet AI

There are currently six modes in Skeet AI mode. Each mode uses AI to automate professional tasks.

- $prisma - Automatic generation of Prisma schema
- $method - Automatic generation of functions
- $typedoc - Automatic generation of TypeDoc
- $firestore - Automatic generation of Firestore models
- $translate - AI translation
- $function - Automatic generation of Firebase Functions

## Launching Skeet AI Mode

You can launch the AI mode by running the skeet ai command as follows.

```bash
$ skeet ai
╔══════════════╤════════════════╗
│ Option       │ Value          │
╟──────────────┼────────────────╢
│ Type of AI   │ VertexAI       │
╟──────────────┼────────────────╢
│ Model        │ chat-bison@001 │
╟──────────────┼────────────────╢
│ Max Tokens   │ 1000           │
╟──────────────┼────────────────╢
│ Temperature  │ 0              │
╚══════════════╧════════════════╝

🤖 Skeet AI Mode
 $ <mode> to change AI mode 🤖

$ prisma
$ typedoc
$ translate
$ firestore
$ function
$ method
$ help
$ q

VertexAI has been selected 🤖 (Enter 'q' to quit)


? How can I assist you?

You: $ prisma
```

While Skeet AI is running, you can change the AI mode by entering a command that starts with `$`.

The default AI is VertexAI.
You can also use OpenAI by changing the options.

```bash
$ skeet ai --help
Usage: skeet ai [options]

AI Playground

Options:
  -v, --vertex                   Vertex AI
  -o, --openai                   OpenAI
  -m, --model <string>           Model
  -token, --token <number>       Max Tokens
  -temp, --temperature <number>  Temperature
  -h, --help                     display help for command
```

## Setting the Language for Skeet AI

Skeet AI uses the language set in _skeet-cloud.config.json_. Currently, 17 languages are supported. You can change the language of the AI by modifying the lang property of the ai.

Example of _skeet-cloud.config.json_:

```json
{
  // omitted
  "ai": {
    "lang": "en",
    "ais": [
      {
        "name": "VertexAI",
        "availableModels": ["chat-bison@001", "chat-bison-32k"]
      }
    ]
  }
}
```
