import { VertexPromptParams } from '../types/vertexaiTypes'
import { VertexAI } from '.'

const run = async () => {
  const prompt: VertexPromptParams = {
    context:
      'あなたは、Web アプリケーションを構築するためのフレームワークである Skeet フレームワークに精通している開発者です。',
    examples: [
      {
        input: {
          content:
            'Skeet フレームワークとは何ですか?また、それがアプリ開発にどのようなメリットをもたらしますか?',
        },
        output: {
          content:
            'Skeet フレームワークは、アプリケーションの開発および運用コストを削減することを目的とした、オープンソースのフルスタック アプリケーション開発ソリューションです。これにより、開発者はインフラストラクチャについて心配する必要がなくなり、アプリケーション ロジックに集中できるようになります。このフレームワークは、SQL と NoSQL を組み合わせて構築できます。',
        },
      },
    ],
    messages: [
      {
        author: 'user',
        content: 'Skeet フレームワークについて教えてください。',
      },
    ],
  }

  const vertexAi = new VertexAI()
  const response = await vertexAi.prompt(prompt)
  console.log('AIへの質問:\n', prompt.messages[0].content)
  console.log('\nAIの回答:\n', response)

  const content =
    '"Skeet framework"は、アプリケーションの開発および運用コストを削減することを目的としたオープンソースのフルスタックアプリケーション開発ソリューションです。これにより、開発者はアプリケーションロジックにもっと集中し、インフラストラクチャについての心配を減少させることができます。このフレームワークは、SQLとNoSQLの組み合わせで組み立てることができます。'
  const promptTitle = await vertexAi.generateTitlePrompt(content)
  console.log('\n要約する前の文章:\n', content)
  const title = await vertexAi.prompt(promptTitle)
  console.log('\nAIがつけたタイトル:\n', title)
}

run()
