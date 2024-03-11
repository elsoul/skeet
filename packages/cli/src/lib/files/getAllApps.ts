import { mkdir } from 'fs/promises'
import { getDirectoryLastModified } from './getDirectoryLastModified'
import { getFunctions } from './getFunctions'
import { getSQLs } from './getSQLs'
import path from 'path'

export const getAllApps = async () => {
  try {
    const functionDirs = []
    const dirs = (await getFunctions()).map((dir) => `functions/${dir}`)
    const sqls = (await getSQLs()).map((dir) => `sql/${dir}`)
    dirs.push('webapp')
    if (!path.join(process.cwd(), 'webapp')) {
      await mkdir('webapp', { recursive: true })
    }
    dirs.push(...sqls)
    for (const dir of dirs) {
      const name = dir
      const lastModified = await getDirectoryLastModified(dir)
      functionDirs.push({
        name,
        lastModified,
      })
    }

    functionDirs.sort(
      (a, b) => b.lastModified.getTime() - a.lastModified.getTime(),
    )
    const result = functionDirs.map((dir) => dir.name)
    result.push('root')
    const uniqueResult = result.map((dir) => {
      if (dir.includes('functions')) {
        return dir.split('/')[1] + '-func'
      } else if (dir.includes('sql')) {
        return dir.split('/')[1]
      }
      return dir
    })
    return uniqueResult
  } catch (error) {
    console.error('getAllApps:', error)
    return []
  }
}
