import { SkeetAI } from '@skeet-framework/ai'
import chalk from 'chalk'
import { promptUser } from '../ai'
import { getRecentUpdatedFiles } from '@/cli/get/getRecentUpdatedFiles'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { yesOrNo } from './yesOrNoMode'
import { TranslateJson } from '@/types/skeetTypes'
import { TRANSLATE_PATH } from '@/index'
import { log } from '..'

export const translateMode = async (skeetAi: SkeetAI) => {
  const pathFile = TRANSLATE_PATH
  console.log(chalk.cyan(log.translateMode.init))
  console.log(chalk.white(log.translateMode.modeDesc))
  if (existsSync('tmp') === false) {
    mkdirSync('tmp', { recursive: true })
  }
  let initJson: TranslateJson = {
    langFrom: 'en',
    langsTo: ['ja'],
    paths: [],
  }
  if (!existsSync(pathFile)) {
    const paths = await getRecentUpdatedFiles(process.cwd(), 5, ['json', 'md'])
    initJson = {
      langFrom: 'en',
      langsTo: ['ja'],
      paths,
    }
    writeFileSync(pathFile, JSON.stringify(initJson, null, 2))
  }
  initJson = JSON.parse(readFileSync(pathFile, 'utf8')) as TranslateJson
  console.log(
    chalk.white(
      `\n${log.common.getFileDesc}\n\n${chalk.green(
        `$ skeet get files --limit 5 --translate`
      )}\n\n ${log.translateMode.currentSet}: \n${JSON.stringify(
        initJson,
        null,
        2
      )}`
    )
  )

  const isYes = (await yesOrNo(log.common.areYouReady)) as boolean
  if (!isYes) {
    promptUser(skeetAi.initOptions)
    return
  }
  for (const lang of initJson.langsTo) {
    const translatePaths = JSON.parse(
      readFileSync(pathFile, 'utf8')
    ) as TranslateJson
    await skeetAi.translates(
      translatePaths.paths,
      translatePaths.langFrom,
      lang
    )
  }
  console.log(chalk.white(log.translateMode.ExitingMode + '...\n'))
  promptUser(skeetAi.initOptions)
  return
}
