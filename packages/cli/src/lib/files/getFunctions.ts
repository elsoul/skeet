import { mkdir, readdir } from 'fs/promises'
import path from 'path'
import { sortDirsByLastModified } from './sortDirsByLastModified'

export const getFunctions = async () => {
  try {
    const dir = path.join(process.cwd(), 'functions')
    if (!dir) {
      await mkdir(dir)
    }
    const sqlDirs = (await readdir(dir)).map((dirName) =>
      path.join(dir, dirName),
    )
    const result = await sortDirsByLastModified(sqlDirs)
    return result
  } catch (error) {
    console.log('getFunctions:', error)
    return ['']
  }
}
