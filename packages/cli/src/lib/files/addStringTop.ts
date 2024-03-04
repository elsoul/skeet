import { readFile, writeFile } from 'fs/promises'

export const addStringTop = async (filePath: string, stringToAdd: string) => {
  const fileContents = await readFile(filePath, 'utf8')
  const newContents = stringToAdd + fileContents
  await writeFile(filePath, newContents, 'utf8')
  return true
}
