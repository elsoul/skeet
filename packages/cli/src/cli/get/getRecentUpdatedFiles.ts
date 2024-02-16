import { readdirSync, statSync } from 'fs'
import path from 'path'

export type FileType = 'json' | 'md' | 'all'

export const getRecentUpdatedFiles = async (
  dir: string,
  limit: number = 5,
  fileTypes: FileType[] = ['all']
): Promise<string[]> => {
  const getFiles = (dirPath: string): string[] => {
    const entries = readdirSync(dirPath, { withFileTypes: true })

    const files = entries
      .filter((fileDirent) => {
        const fullPath = path.join(dirPath, fileDirent.name)
        const isDesiredFileType =
          fileTypes.includes('all') ||
          (fileTypes.includes('json') && fileDirent.name.endsWith('.json')) ||
          (fileTypes.includes('md') && fileDirent.name.endsWith('.md'))
        return (
          fileDirent.isFile() &&
          isDesiredFileType &&
          !fullPath.includes('.git') &&
          !fullPath.includes('/dist') &&
          !fileDirent.name.startsWith('.') &&
          !fileDirent.name.endsWith('.js')
        )
      })
      .map((fileDirent) => path.join(dirPath, fileDirent.name))

    const folders = entries.filter((folderDirent) => {
      const fullPath = path.join(dirPath, folderDirent.name)
      return (
        folderDirent.isDirectory() &&
        !fullPath.includes('.git') &&
        !fullPath.includes('/dist') &&
        !folderDirent.name.startsWith('.')
      )
    })

    for (const folder of folders) {
      files.push(...getFiles(path.join(dirPath, folder.name)))
    }

    return files
  }

  const allFiles = getFiles(dir)
  const sortedFiles = allFiles.sort((a, b) => {
    return statSync(b).mtime.getTime() - statSync(a).mtime.getTime()
  })
  const result = sortedFiles.slice(0, limit)
  return result
}
