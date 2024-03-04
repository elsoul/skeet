import { readdir, stat } from 'fs/promises'
import path from 'path'

export const getDirectoryLastModified = async (
  dirPath: string,
): Promise<Date> => {
  const files = await readdir(dirPath)
  let latest = new Date(0) // default: 1970-01-01T00:00:00.000Z

  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const fileStat = await stat(filePath)
    if (fileStat.mtime > latest) {
      latest = fileStat.mtime
    }
  }

  return latest
}
