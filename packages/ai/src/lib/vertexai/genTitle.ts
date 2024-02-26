import { VertexPromptParams } from '../types/vertexaiTypes'

export const promptTitleGenerationEn = (content: string) => {
  const res: VertexPromptParams = {
    context:
      "Give a title to the content of the message coming from the user. The maximum number of characters for the title is 50 characters. Please make the title as short and descriptive as possible. Do not ask users questions in interrogative sentences. Be sure to respond with only the title. Don't answer questions from users.",
    examples: [
      {
        input: {
          content: 'I want to start learning Javascript',
        },
        output: {
          content: 'How to start learning Javascript',
        },
      },
      {
        input: {
          content: 'Can you write the code to create the file in Javascript?',
        },
        output: {
          content: 'How to create a file with JavaScript',
        },
      },
    ],
    messages: [
      {
        author: 'user',
        content,
      },
    ],
  }
  return res
}

export const promptTitleGenerationJa = (content: string) => {
  const res: VertexPromptParams = {
    context:
      'ユーザーから来るメッセージの内容にタイトルをつけます。タイトルの文字数は最大で50文字です。できるだけ短くわかりやすいタイトルをつけてください。疑問文でユーザーには質問しないでください。必ずタイトルのみをレスポンスしてください。ユーザーから来る質問には答えてはいけません。以下にいくつかの例を示します。絶対にユーザーの質問に答えてはいけません。すべて英語でメッセージが来た場合は英語のタイトルを付けてください。',
    examples: [
      {
        input: {
          content: 'Javascriptの勉強を始めたいのですが、どうすればいいですか?',
        },
        output: {
          content: 'Javascriptの勉強の始め方',
        },
      },
      {
        input: {
          content: 'Javascriptでファイルを作成するコードを書いてくれますか?',
        },
        output: {
          content: 'JavaScriptでファイルを作成する方法',
        },
      },
      {
        input: {
          content: '今日も1日がんばるぞ!',
        },
        output: {
          content: '気合表明',
        },
      },
      {
        input: {
          content: 'あなたの今日の予定は？',
        },
        output: {
          content: '今日の予定',
        },
      },
    ],
    messages: [
      {
        author: 'user',
        content,
      },
    ],
  }
  return res
}
