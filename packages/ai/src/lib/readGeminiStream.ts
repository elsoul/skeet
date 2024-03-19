import { StreamGenerateContentResult } from '@google-cloud/vertexai'
import { VertexAiResponse } from './types/vertexAiResponseTypes'
import chalk from 'chalk'
import { inspect } from 'util'

export const readGeminiStream = async (
  streamingResp: StreamGenerateContentResult,
) => {
  for await (const item of streamingResp.stream) {
    // itemをVertexAiResponse型として扱います。型アサーションを適宜調整してください。
    const text = JSON.parse(JSON.stringify(item)) as unknown as VertexAiResponse
    try {
      // `console.log`の代わりに`process.stdout.write`を使用して改行なしでテキストを出力
      if (text.candidates[0].content.parts[0].text) {
        process.stdout.write(
          chalk.white(text.candidates[0].content.parts[0].text),
        )
      }
    } catch (error) {
      process.stdout.write(
        chalk.white('Something went wrong... Please try again 🙇'),
      )
      return error
    }
  }

  // ストリームの終了後、改行を出力して区切ります
  process.stdout.write('\n')

  // 最終的なレスポンスを処理
  const response = JSON.parse(
    JSON.stringify(await streamingResp.response),
  ) as unknown as VertexAiResponse
  return response
}
