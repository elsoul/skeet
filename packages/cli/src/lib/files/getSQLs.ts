import { mkdir, readdir } from 'fs/promises'
import path from 'path'
import { sortDirsByLastModified } from './sortDirsByLastModified'

export const getSQLs = async () => {
  try {
    const dir = path.join(process.cwd(), 'sql')
    if (!dir) {
      await mkdir(dir, { recursive: true })
    }
    const sqlDirs = (await readdir(dir)).map((dirName) =>
      path.join(dir, dirName),
    )
    const result = await sortDirsByLastModified(sqlDirs)
    return result
  } catch (error) {
    console.log('Error getting SQL directories:', error)
    return ['']
  }
}
