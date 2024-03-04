import { readFile, readdir, stat } from 'fs/promises'
import path from 'path'
import { checkFileDirExists } from './checkFileDirExists'

export const getFunctionModelFiles = async (functionName: string) => {
  try {
    const baseModelPath = path.join(
      '.',
      'functions',
      functionName,
      'src',
      'models',
    )
    const sqlModelPath = path.join(baseModelPath, 'sql')

    const getFilesFromDirectory = async (dirPath: string) => {
      const files = await readdir(dirPath)
      return Promise.all(
        files.map(async (fileName) => {
          const filePath = path.join(dirPath, fileName)
          const fileStat = await stat(filePath)
          return fileStat.isFile() ? filePath : null
        }),
      ).then((paths) => paths.filter(Boolean)) as Promise<string[]>
    }

    let files = await getFilesFromDirectory(baseModelPath)

    const sqlModelPathExists = await checkFileDirExists(sqlModelPath)
    if (sqlModelPathExists && (await stat(sqlModelPath)).isDirectory()) {
      files = files.concat(await getFilesFromDirectory(sqlModelPath))
    }
    files = files.filter((file) => !file.includes('/src/models/lib'))

    const modelFilesStrings = await Promise.all(
      files.map(async (file) => await readFile(file, 'utf8')),
    )

    return modelFilesStrings.join('\n\n')
  } catch (error) {
    throw new Error(`getFunctionModelFiles: ${error}`)
  }
}
