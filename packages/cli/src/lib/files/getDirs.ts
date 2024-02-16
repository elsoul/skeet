import * as path from 'path'
import { FUNCTIONS_PATH } from './getSkeetConfig'
import { readdirSync, statSync } from 'fs'

export const getDirectoryLastModified = (directoryPath: string): Date => {
  const fileNames = readdirSync(directoryPath)
  let latestModified: Date = new Date(0)

  fileNames.forEach((fileName) => {
    const filePath = path.join(directoryPath, fileName)
    const stats = statSync(filePath)

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

export const getFunctions = (isForModels = false): string[] => {
  try {
    const functionDirs = readdirSync(FUNCTIONS_PATH, { withFileTypes: true })
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
      (a, b) => b.lastModified.getTime() - a.lastModified.getTime(),
    )

    return functionDirs.map((dir) => dir.name)
  } catch (error) {
    console.error('Error getting function directories:', error)
    return []
  }
}

export const functionsInstanceTypes = [
  'onCall',
  'http',
  'firestore',
  'pubsub',
  'schedule',
  'auth',
]
