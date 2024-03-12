---
'@skeet-framework/utils': patch
'@skeet-framework/cli': patch
---

Update - skeet ai

```bash
$ skeet ai
╔═════════╤════════╗
│ Option  │ Value  │
╟─────────┼────────╢
│ AI Type │ Gemini │
╚═════════╧════════╝

🤖 Skeet AI Mode
Type `mode` to change AI mode 🤖


Gemini is selected 🤖 (type 'q' to quit)


? What can I do for you?

You: mode
Skeet:
? 🤖 Select Mode (Use arrow keys)
❯ prisma
  typedoc
  firestore
  function
  method
```

or directly call skeet ai mode with the option

```bash
$ skeet ai --mode
? 🤖 Select Mode (Use arrow keys)
❯ prisma
  typedoc
  firestore
  function
  method
```
