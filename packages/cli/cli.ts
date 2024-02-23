import { execSync } from 'child_process'
import { writeFile } from 'fs/promises'

// `$ skeet --help`からコマンドのリストを取得
function getCommands(): string[] {
  const helpOutput = execSync('skeet --help').toString()

  // 正規表現を使用してコマンド名を抽出 (これは仮の正規表現で、実際の出力に合わせて調整が必要です)
  const commandMatches = helpOutput.match(/^\s*(\w+)\s+/gm)

  if (!commandMatches) return []

  return commandMatches.map((cmd) => cmd.trim())
}

// 各コマンドに対して詳細なヘルプを取得
function getDetailedHelpForCommand(command: string): string {
  return execSync(`skeet ${command} --help`).toString()
}

// 実行
const commands = getCommands()
const detailedHelpArray: string[] = []

for (const command of commands) {
  const detailedHelp = getDetailedHelpForCommand(command)
  detailedHelpArray.push(detailedHelp)
}

writeFile('detailedHelpArray.txt', detailedHelpArray.join('\n\n'))
console.log(detailedHelpArray)
