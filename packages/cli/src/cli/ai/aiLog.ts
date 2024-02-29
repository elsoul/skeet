import { utcNow } from '@skeet-framework/utils'
import chalk from 'chalk'
import CliTable3 from 'cli-table3'
import { appendFileSync, existsSync, mkdirSync } from 'fs'
import { SkeetAiMode } from '../../types/skeetTypes'
import SkeetLangJA from './locales/ja/skeetAi.json'
import SkeetLangEN from './locales/en/skeetAi.json'
import { SkeetAIOptions } from '.'

const SkeetLangs = {
  ja: SkeetLangJA,
  en: SkeetLangEN,
}

export class AiLog {
  lang: 'ja' | 'en'
  localeFile: SkeetLog

  constructor(lang = 'en' as 'ja' | 'en') {
    this.lang = lang
    this.localeFile = SkeetLangs[lang]
  }

  text = () => {
    return this.localeFile
  }

  help = () => {
    console.log(
      chalk.white(
        `\n🤖 ${this.text().common.skeetAiModeText} 🤖\n\n` +
          '$ prisma\n' +
          '$ typedoc\n' +
          '$ translate\n' +
          '$ firestore\n' +
          '$ function\n' +
          '$ method\n' +
          '$ help\n' +
          '$ q\n',
      ),
    )
  }

  aiOptionTable = (aiOptions: SkeetAIOptions) => {
    const table = new CliTable3({
      head: [chalk.blue('Option'), chalk.blue('Value')],
      chars: {
        top: '═',
        'top-mid': '╤',
        'top-left': '╔',
        'top-right': '╗',
        bottom: '═',
        'bottom-mid': '╧',
        'bottom-left': '╚',
        'bottom-right': '╝',
        left: '│',
        'left-mid': '╟',
        mid: '─',
        'mid-mid': '┼',
        right: '│',
        'right-mid': '╢',
        middle: '│',
      }, // テーブルの罫線スタイルを指定
    })

    table.push(
      [this.text().common.aiType, aiOptions.ai],
      [this.text().common.model, aiOptions.model],
      [this.text().common.maxToken, aiOptions.maxTokens],
      [this.text().common.temperature, aiOptions.temperature],
    )

    console.log(table.toString())
  }

  addJson = (
    role: string,
    content: string,
    mode: SkeetAiMode,
    model: string,
  ) => {
    const tmpJson = `tmp/ai/history-${this.lang}.jsonl`
    if (!existsSync('tmp/ai')) {
      mkdirSync('tmp/ai', { recursive: true })
    }
    const data = {
      role,
      content,
      mode,
      model,
      createdAt: utcNow(),
    }
    let insertData = ''
    if (existsSync(tmpJson) === false) {
      appendFileSync(tmpJson, '')
      insertData = JSON.stringify(data)
    } else {
      insertData = ',\n' + JSON.stringify(data)
    }
    appendFileSync(tmpJson, insertData)
  }
}
