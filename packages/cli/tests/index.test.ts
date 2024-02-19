// tests/cli.test.ts
import { describe, it, expect } from 'vitest'
import { exec } from 'child_process'
import util from 'util'

// execをPromiseにラップする
const execPromise = util.promisify(exec)

describe('CLI app', () => {
  it('should return CLI for Skeet - Full-stack TypeScript Serverless framework', async () => {
    // CLIコマンドの実行
    const command = 'node ./dist/index.js help'
    const { stdout, stderr } = await execPromise(command)

    // 標準エラーに何も出力されないことを確認
    expect(stderr).toBe('')

    // 標準出力が期待するメッセージを含むことを確認
    expect(stdout.trim()).include(
      'CLI for Skeet - Full-stack TypeScript Serverless framework',
    )
  })
})
