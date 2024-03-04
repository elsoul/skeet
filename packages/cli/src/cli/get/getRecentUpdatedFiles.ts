import { readdir, stat } from 'fs/promises'
import path from 'path'

export type FileType = 'json' | 'md' | 'all'

export const getRecentUpdatedFiles = async (
  dir: string,
  limit: number = 5,
  fileTypes: FileType[] = ['all'],
): Promise<string[]> => {
  const getFiles = async (dirPath: string): Promise<string[]> => {
    const entries = await readdir(dirPath, { withFileTypes: true })

    let files: string[] = []

    for (const fileDirent of entries) {
      const fullPath = path.join(dirPath, fileDirent.name)
      if (
        fileDirent.isDirectory() &&
        !fullPath.includes('.git') &&
        !fullPath.includes('/dist') &&
        !fileDirent.name.startsWith('.')
      ) {
        files = files.concat(await getFiles(fullPath))
      } else if (
        fileDirent.isFile() &&
        (fileTypes.includes('all') ||
          (fileTypes.includes('json') && fileDirent.name.endsWith('.json')) ||
          (fileTypes.includes('md') && fileDirent.name.endsWith('.md'))) &&
        !fullPath.includes('.git') &&
        !fullPath.includes('/dist') &&
        !fileDirent.name.startsWith('.') &&
        !fileDirent.name.endsWith('.js')
      ) {
        files.push(fullPath)
      }
    }

    return files
  }

  const allFiles = await getFiles(dir)

  // ファイルのメタデータを非同期で取得
  const filesWithStats = await Promise.all(
    allFiles.map(async (file) => {
      const stats = await stat(file)
      return { file, mtime: stats.mtime.getTime() }
    }),
  )

  // メタデータに基づいてファイルをソート
  filesWithStats.sort((a, b) => b.mtime - a.mtime)

  // ソートされたファイルのパスを取得
  const sortedFiles = filesWithStats.map((fws) => fws.file)

  return sortedFiles.slice(0, limit)
}
