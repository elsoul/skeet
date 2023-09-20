import { readFileSync, readdirSync, statSync } from 'fs'
import * as path from 'path'
import { getFunctions } from './getDirs'

export const getModelFiles = async () => {
  const functions = getFunctions(true)
  const data = []
  for (const functionName of functions) {
    const httpRoutingPath = path.join(
      '.',
      'functions',
      functionName,
      'src',
      'models',
    )
    let files = readdirSync(httpRoutingPath).map(
      (fileName) => httpRoutingPath + '/' + fileName,
    )

    files = files.filter((file) => !file.includes('/src/models/lib'))

    data.push({ functionName, modelsPath: files })
  }
  return data
}

export const getFunctionModelFiles = (functionName: string) => {
  try {
    const baseModelPath = path.join(
      '.',
      'functions',
      functionName,
      'src',
      'models',
    )
    const sqlModelPath = path.join(baseModelPath, 'sql')

    // 指定されたディレクトリ内のファイルのみを取得するヘルパー関数
    const getFilesFromDirectory = (dirPath: string) => {
      return readdirSync(dirPath)
        .map((fileName) => path.join(dirPath, fileName))
        .filter((filePath) => statSync(filePath).isFile())
    }

    let files = getFilesFromDirectory(baseModelPath)

    // sqlディレクトリが存在する場合、その中のファイルも取得
    if (statSync(sqlModelPath).isDirectory()) {
      files = files.concat(getFilesFromDirectory(sqlModelPath))
    }

    // 不要なファイルをフィルタリング
    files = files.filter((file) => !file.includes('/src/models/lib'))

    const modelFilesStrings = files.map((file) => readFileSync(file, 'utf8'))

    return modelFilesStrings.join('\n\n')
  } catch (error) {
    throw new Error(`getFunctionModelFiles: ${error}`)
  }
}
