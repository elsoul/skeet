import { readFile } from 'fs/promises'

export async function getExportedFunctions(filePath: string) {
  try {
    const fileContent = await readFile(filePath, 'utf-8')
    const regex = /export\s+{\s+([^}]+)\s+}/g

    const match = regex.exec(fileContent)

    if (match && match[1]) {
      const functionNames = match[1]
        .split('\n')
        .map((line) => line.trim().replace(',', '').replace(';', ''))
        .filter((line) => line && !line.startsWith('//'))
      return functionNames
    }

    return []
  } catch (error) {
    throw new Error(`getExportedFunctions: ${error}`)
  }
}
