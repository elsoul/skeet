import fs from 'fs'
import path from 'path'

interface DirectoryInfo {
  name: string
  lastModified: Date
}

const getDirectoryLastModified = (directoryPath: string): Date => {
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

export const getDirectoriesRecursively = (directoryPath: string): string[] => {
  try {
    const directories: DirectoryInfo[] = []

    const traverseDirectories = (currentPath: string) => {
      const fileNames = fs.readdirSync(currentPath)

      fileNames.forEach((fileName) => {
        const filePath = path.join(currentPath, fileName)
        const stats = fs.statSync(filePath)

        if (stats.isDirectory()) {
          const lastModified = getDirectoryLastModified(filePath)
          directories.push({ name: fileName, lastModified })
          traverseDirectories(filePath)
        }
      })
    }

    traverseDirectories(directoryPath)

    directories.sort(
      (a, b) => b.lastModified.getTime() - a.lastModified.getTime()
    )

    return directories.map((directory) => directory.name)
  } catch (error) {
    console.error(`Error traversing directories: ${directoryPath}`, error)
    return []
  }
}
