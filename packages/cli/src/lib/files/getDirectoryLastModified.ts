import { readdirSync, statSync } from 'fs'
import path from 'path'

export const getDirectoryLastModified = (dirPath: string): Date => {
  const files = readdirSync(dirPath)
  return files.reduce((latest, file) => {
    const filePath = path.join(dirPath, file)
    const stat = statSync(filePath)
    return stat.mtime > latest ? stat.mtime : latest
  }, new Date(0)) // default: 1970-01-01T00:00:00.000Z
}
