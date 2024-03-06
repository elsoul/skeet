import { getDirectoryLastModified } from './getDirectoryLastModified'

export const sortDirsByLastModified = async (dirs: string[]) => {
  const dirsWithStats = []
  for await (const dir of dirs) {
    const lastModified = await getDirectoryLastModified(dir)
    dirsWithStats.push({ name: dir, mtime: lastModified })
  }

  // Sort by last modified date
  dirsWithStats.sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
  const dirNames = dirsWithStats.map((dir) => dir.name.split('/').pop())
  return dirNames as string[]
}
