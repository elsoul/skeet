import * as fs from 'fs'
import * as path from 'path'
import { FUNCTIONS_PATH } from './getSkeetConfig'

interface DirectoryInfo {
  name: string
  lastModified: Date
}

export const getDirectoryLastModified = (directoryPath: string): Date => {
  const fileNames = fs.readdirSync(directoryPath)
  let latestModified: Date = new Date(0) // 初期値を古い日時に設定

  fileNames.forEach((fileName) => {
    const filePath = path.join(directoryPath, fileName)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      const directoryModified = getDirectoryLastModified(filePath)
      if (directoryModified > latestModified) {
        latestModified = directoryModified
      }
    } else if (stats.isFile() && stats.mtime > latestModified) {
      latestModified = stats.mtime
    }
  })

  return latestModified
}

export const getFunctions = async (isForModels = false): Promise<string[]> => {
  try {
    const functionDirs = fs
      .readdirSync(FUNCTIONS_PATH, { withFileTypes: true })
      .filter((item) => item.isDirectory())
      .map((item) => {
        const dirPath = isForModels
          ? path.join(FUNCTIONS_PATH, item.name, 'src', 'models')
          : path.join(FUNCTIONS_PATH, item.name)
        const lastModified = getDirectoryLastModified(dirPath)
        return {
          name: item.name,
          lastModified,
        }
      })

    functionDirs.sort(
      (a, b) => b.lastModified.getTime() - a.lastModified.getTime()
    )

    return functionDirs.map((dir) => dir.name)
  } catch (error) {
    console.error('Error getting function directories:', error)
    return []
  }
}
