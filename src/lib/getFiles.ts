import fs from 'fs'
import path from 'path'

export const getFilesInDirectory = (directoryPath: string) => {
  try {
    const files: { name: string; lastModified: Date }[] = []
    const fileNames = fs.readdirSync(directoryPath)

    fileNames.forEach((fileName) => {
      const filePath = path.join(directoryPath, fileName)
      const stats = fs.statSync(filePath)

      if (stats.isFile() && fileName !== 'index.ts') {
        files.push({ name: fileName, lastModified: stats.mtime })
      }
    })

    return files
  } catch (error) {
    throw new Error(`getFilesInDirectory: ${directoryPath} - ${error}`)
  }
}

export const replaceFileExtension = (
  files: { name: string; lastModified: Date }[]
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

export const getHTTPRoutingFiles = (functionName: string) => {
  try {
    const httpRoutingPath = path.join(
      __dirname,
      'functions',
      functionName,
      'src',
      'rountings',
      'http'
    )
    const files = getFilesInDirectory(httpRoutingPath)
    return replaceFileExtension(files).sort(
      (a, b) => b.lastModified.getTime() - a.lastModified.getTime()
    )
  } catch (error) {
    throw new Error(`getHTTPRoutingFiles: ${error}`)
  }
}
