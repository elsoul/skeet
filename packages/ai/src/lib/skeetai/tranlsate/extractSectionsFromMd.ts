import { readFileSync } from 'fs'

export const extractSectionsFromMd = (path: string) => {
  const content = readFileSync(path, 'utf-8')
  const lines = content.split('\n')

  let sections = []
  let currentSection = []
  let isInsideCodeBlock = false
  let isFirstSection = true

  for (const line of lines) {
    // コードブロックの開始または終了をチェック
    if (line.trim().includes('```')) {
      isInsideCodeBlock = !isInsideCodeBlock
    }

    // 新しいセクションが始まる場合
    if (line.startsWith('#') && !isInsideCodeBlock) {
      if (currentSection.length > 0) {
        // 最初のセクションを除外
        if (!isFirstSection) {
          sections.push(currentSection.join('\n').trim())
        } else {
          isFirstSection = false
        }
        currentSection = []
      }
    }
    currentSection.push(line)
  }

  // 最後のセクションを配列に追加
  if (currentSection.length > 0) {
    sections.push(currentSection.join('\n').trim())
  }
  return sections
}
