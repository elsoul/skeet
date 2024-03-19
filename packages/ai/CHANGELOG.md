# @skeet-framework/ai

## 1.8.5

### Patch Changes

- [#350](https://github.com/elsoul/skeet/pull/350) [`a7037fa`](https://github.com/elsoul/skeet/commit/a7037faea90e1c0a6167817b68eab925fb5ec22b) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update chat response

## 1.8.4

### Patch Changes

- [`5392b4c`](https://github.com/elsoul/skeet/commit/5392b4c7992363f76c5b19bbc2684536a0b9598c) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update skeet ai

## 1.8.3

### Patch Changes

- [#338](https://github.com/elsoul/skeet/pull/338) [`8bad710`](https://github.com/elsoul/skeet/commit/8bad710f9ef620b2635ba3de650a4064a09a20b3) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Add - Claude3 AI

  ```ts
  import { chat } from "@skeet-framework/ai";

  const examples = [
    { input: "Who was the first person in space?", output: "Yuri Gagarin" },
    { input: "Tell me about the Apollo missions.", output: "Gemini" },
  ];
  const aiType = "Claude";
  const context = "You are an helpful AI assistant";
  const content = "Hello, how are you?";
  const result = await chat(context, examples, aiType, content);
  ```

## 1.8.2

### Patch Changes

- [#308](https://github.com/elsoul/skeet/pull/308) [`c70fa8f`](https://github.com/elsoul/skeet/commit/c70fa8f24321104f4cdfc82a4738ebf9fa6752c7) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - add isStream boolean to chat function

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
