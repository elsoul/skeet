import { readdir, stat } from 'fs/promises'
import path from 'path'

export const getFilesInDirectory = async (directoryPath: string) => {
  try {
    const files: { name: string; lastModified: Date }[] = []
    const fileNames = await readdir(directoryPath)

    for (const fileName of fileNames) {
      const filePath = path.join(directoryPath, fileName)
      const stats = await stat(filePath)

      if (stats.isFile() && fileName !== 'index.ts') {
        files.push({ name: fileName, lastModified: stats.mtime })
      }
    }

    return files
  } catch (error) {
    throw new Error(`getFilesInDirectory: ${directoryPath} - ${error}`)
  }
}

export const replaceFileExtension = (
  files: { name: string; lastModified: Date }[],
) => {
  try {
    return files.map((file) => {
      const { name, lastModified } = file
      return {
        name: name.replace('.ts', ''),
        lastModified,
      }
    })
  } catch (error) {
    throw new Error(`replaceFileExtension: ${error}`)
  }
}
