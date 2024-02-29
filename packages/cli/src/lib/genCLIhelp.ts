import chalk from 'chalk'
import { execSync } from 'child_process'
import { writeFile } from 'fs/promises'

// `$ node dist/index.js --help`からコマンドのリストを取得
function getCommands(): string[] {
  const helpOutput = execSync('node dist/index.js --help').toString()

  // 正規表現を使用してコマンド名を抽出 (これは仮の正規表現で、実際の出力に合わせて調整が必要です)
  const commandMatches = helpOutput.match(/^\s*(\w+)\s+/gm)

  if (!commandMatches) return []

  return commandMatches.map((cmd) => cmd.trim())
}

// 各コマンドに対して詳細なヘルプを取得
function getDetailedHelpForCommand(command: string): string {
  return execSync(`node dist/index.js ${command} --help`).toString()
}

// 実行
const commands = getCommands()
const detailedHelpArray: string[] = []

for (const command of commands) {
  const detailedHelp = getDetailedHelpForCommand(command)
  detailedHelpArray.push(detailedHelp)
}

const run = async () => {
  const body = `export const CLI_HELP = \`${detailedHelpArray.join('\n')}\``
  await writeFile('./src/lib/cliHelp.ts', body)
  console.log(chalk.white(`✔️ CLI help written to src/lib/cliHelp.ts`))
}

void run()
