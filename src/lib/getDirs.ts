import * as fs from 'fs'
import * as path from 'path'
import { FUNCTIONS_PATH } from './getSkeetConfig'

interface FunctionInfo {
  name: string
  lastModified: Date
}

const getDirectoryLastModified = (directoryPath: string): Date => {
  const fileNames = fs.readdirSync(directoryPath, { withFileTypes: true })
  let latestModified: Date = new Date(0) // 初期値を古い日時に設定

  fileNames.forEach((file) => {
    if (file.isDirectory()) {
      const filePath = path.join(directoryPath, file.name)
      const stats = fs.statSync(filePath)

      if (stats.isDirectory()) {
        const directoryModified = getDirectoryLastModified(filePath)
        if (directoryModified > latestModified) {
          latestModified = directoryModified
        }
      } else if (stats.isFile() && stats.mtime > latestModified) {
        latestModified = stats.mtime
      }
    }
  })

  return latestModified
}

export const getFunctions = () => {
  const functionDirs: FunctionInfo[] = fs
    .readdirSync(FUNCTIONS_PATH, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => {
      const functionPath = path.join(FUNCTIONS_PATH, item.name)
      const lastModified = getDirectoryLastModified(functionPath)
      return { name: item.name, lastModified }
    })

  const sortedFunctionDirs = functionDirs.sort(
    (a, b) => b.lastModified.getTime() - a.lastModified.getTime()
  )

  return sortedFunctionDirs.map((functionDir) => functionDir.name)
}
