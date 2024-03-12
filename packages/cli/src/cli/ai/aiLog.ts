import chalk from 'chalk'
import CliTable3 from 'cli-table3'
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
      chalk.white(`\n🤖 ${this.text().common.skeetAiModeText} 🤖\n\n`),
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

    table.push([this.text().common.aiType, aiOptions.ai])

    console.log(table.toString())
  }
}
