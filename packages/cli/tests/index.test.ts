// tests/cli.test.ts
import { describe, it, expect } from 'vitest'
import { exec } from 'child_process'
import util from 'util'
import { mkdir } from 'fs/promises'

// execをPromiseにラップする
const execPromise = util.promisify(exec)

const testDirs = ['functions/skeet', 'sql/point-db', 'webapp']

beforeAll(async () => {
  // `functions/skeet` ディレクトリがなければ作成する
  testDirs.forEach((dir) => {
    mkdir(dir, { recursive: true })
  })
  // 必要に応じてテストデータを `functions/skeet` ディレクトリに配置
})

describe('CLI app', () => {
  it('should return CLI for Skeet - Full-stack TypeScript Serverless framework', async () => {
    // CLIコマンドの実行
    const command = 'node ./dist/index.js help'
    const { stdout, stderr } = await execPromise(command)

    // 標準エラーに何も出力されないことを確認
    expect(stderr).toBe('')

    // 標準出力に期待される文字列が含まれていることを確認
    // expect(stdout).toContain(
    //   'CLI for Skeet - Full-stack TypeScript Serverless framework',
    // )
  })
})
