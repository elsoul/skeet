import { readFileSync, writeFileSync } from 'fs'

export const addStringTop = (filePath: string, stringToAdd: string) => {
  const fileContents = readFileSync(filePath, 'utf8')
  const newContents = stringToAdd + fileContents
  writeFileSync(filePath, newContents, 'utf8')
  return true
}
