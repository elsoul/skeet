import { SkeetAI } from '@skeet-framework/ai'
import chalk from 'chalk'
import * as readline from 'readline'
import { promptUser } from '../ai'
import { getRecentUpdatedFiles } from '@/cli/get/getRecentUpdatedFiles'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { yesOrNoMode } from './yesOrNoMode'
import { TranslateJson } from '@/types/skeetTypes'

export const translateMode = async (
  skeetAi: SkeetAI,
  rl: readline.Interface
) => {
  const pathFile = 'tmp/translate.json'
  console.log(chalk.cyan('🎓 Translation Mode 🎓'))
  console.log(
    chalk.white(
      `Please update ${chalk.green(
        pathFile
      )} with the file paths you want to translate.`
    )
  )
  if (existsSync('tmp') === false) {
    mkdirSync('tmp', { recursive: true })
  }
  let initJson: TranslateJson = {
    langFrom: 'en',
    langTo: 'ja',
    paths: [],
  }
  if (!existsSync(pathFile)) {
    const paths = await getRecentUpdatedFiles(process.cwd(), 5, ['json', 'md'])
    initJson = {
      langFrom: 'en',
      langTo: 'ja',
      paths,
    }
    writeFileSync(pathFile, JSON.stringify(initJson, null, 2))
  }
  initJson = JSON.parse(readFileSync(pathFile, 'utf8')) as TranslateJson
  console.log(
    chalk.white(
      `\nThis command shows most recent updated files.\n\n${chalk.green(
        `$ skeet get files --limit 5 --translate`
      )}\n\n Current Set: \n${JSON.stringify(initJson, null, 2)}`
    )
  )

  const text = `\n❓ Are you ready for AI translation ? (Yes/No) `
  const isYes = (await yesOrNoMode(rl, text)) as boolean
  if (!isYes) {
    promptUser(skeetAi.initOptions)
    return
  }
  const translatePaths = JSON.parse(
    readFileSync(pathFile, 'utf8')
  ) as TranslateJson
  await skeetAi.translates(
    translatePaths.paths,
    translatePaths.langFrom,
    translatePaths.langTo
  )
  promptUser(skeetAi.initOptions)
  return
}
