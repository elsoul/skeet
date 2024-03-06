# @skeet-framework/ai

## 1.8.1

### Patch Changes

- [#300](https://github.com/elsoul/skeet/pull/300) [`1c1696c`](https://github.com/elsoul/skeet/commit/1c1696cc5c77b17434d87b4cf7119218d9f40c5a) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Add - chat

  chat function can call Gemini and OpenAI with the same arguments, making it easy to compare the results of Gemini and OpenAI.

  ```ts
  import { chat } from "@skeet-framework/ai";

  const context = "You are a helpful assistant.";
  const examples = [
    {
      input: "What is the capital of France?",
      output: "The capital of France is Paris.",
    },
    {
      input: "What is the capital of Spain?",
      output: "The capital of Spain is Madrid.",
    },
    {
      input: "What is the capital of Italy?",
      output: "The capital of Italy is Rome.",
    },
  ];
  const input = "What is the capital of France?";

  const gemini = await chat(context, examples, input, "Gemini");
  const openai = await chat(context, examples, input, "OpenAI");
  ```

## 1.8.0

### Minor Changes

- [#280](https://github.com/elsoul/skeet/pull/280) [`1139e36`](https://github.com/elsoul/skeet/commit/1139e36e3a8ab8723c8a5667703f9c02f101d887) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update VertexAI to Gemini
