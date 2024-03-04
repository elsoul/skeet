import * as path from 'path'
import { FUNCTIONS_PATH } from './getSkeetConfig'
import { readdir, stat } from 'fs/promises'

export const getDirectoryLastModified = async (
  directoryPath: string,
): Promise<Date> => {
  const fileNames = await readdir(directoryPath)
  let latestModified = new Date(0)

  for (const fileName of fileNames) {
    const filePath = path.join(directoryPath, fileName)
    const stats = await stat(filePath)

    if (stats.isDirectory()) {
      const directoryModified = await getDirectoryLastModified(filePath)
      if (directoryModified > latestModified) {
        latestModified = directoryModified
      }
    } else if (stats.isFile() && stats.mtime > latestModified) {
      latestModified = stats.mtime
    }
  }

  return latestModified
}

export const getFunctions = async (isForModels = false): Promise<string[]> => {
  try {
    const functionDirs = await readdir(FUNCTIONS_PATH, { withFileTypes: true })
    const dirs = functionDirs.filter((item) => item.isDirectory())

    const dirsWithLastModified = await Promise.all(
      dirs.map(async (item) => {
        const dirPath = isForModels
          ? path.join(FUNCTIONS_PATH, item.name, 'src', 'models')
          : path.join(FUNCTIONS_PATH, item.name)
        const lastModified = await getDirectoryLastModified(dirPath)
        return {
          name: item.name,
          lastModified,
        }
      }),
    )

    dirsWithLastModified.sort(
      (a, b) => b.lastModified.getTime() - a.lastModified.getTime(),
    )

    return dirsWithLastModified.map((dir) => dir.name)
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
