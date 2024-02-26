import { extractSectionsFromMd } from './extractSectionsFromMd'
import { translateDocument } from './translateDocument'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { translateJsonDocuments } from './translateJsonDocuments'
import { organizeFilesByExtension } from './organizePaths'
import SkeetAI from '@/lib/skeetai'

export const skeetAiTranslates = async (
  paths: string[],
  langFrom: string,
  langTo: string,
  skeetAi: SkeetAI,
) => {
  try {
    const organizedPaths = organizeFilesByExtension(paths)
    if (organizedPaths.mdFiles.length !== 0)
      await translateMarkdownDocuments(
        organizedPaths.mdFiles,
        langFrom,
        langTo,
        skeetAi,
      )
    if (organizedPaths.jsonFiles.length !== 0)
      await translateJsonDocuments(
        organizedPaths.jsonFiles,
        langFrom,
        langTo,
        skeetAi,
      )
  } catch (error) {
    throw new Error(`skeetDocument: ${error}`)
  }
}

const translateMarkdownDocuments = async (
  paths: string[],
  langFrom = 'ja',
  langTo = 'en',
  skeetAi: SkeetAI,
) => {
  let i = 0
  console.log(`From ${langFrom} to ${langTo}`)
  const outputPaths = []
  for (const path of paths) {
    console.log(`\nTranslating document: ${i + 1}/${paths.length} paths`)
    const sections = extractSectionsFromMd(path)
    let j = 0
    const pathSplit = path.split('/')
    const lang = pathSplit[pathSplit.length - 2]
    const pathNum = pathSplit.length - 1
    const outputPath = path.replace(lang, `${langTo}`)
    const outputDir = outputPath.replace(pathSplit[pathNum], '')
    if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true })
    outputPaths.push(outputPath)
    const mdContents = []
    for (const section of sections) {
      console.log(`\nTranslating section: ${j + 1}/${sections.length}`)

      const translatedContent = await translateDocument(
        section,
        skeetAi,
        'markdown',
        langFrom,
        langTo,
      )
      mdContents.push(translatedContent)
      console.log(translatedContent)
      j++
    }
    writeFileSync(outputPath, mdContents.join('\n\n'))
    i++
  }
  console.log('Generated documents: ', outputPaths)
}
