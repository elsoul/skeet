import { readdir } from 'fs/promises'
import * as path from 'path'
import { getFunctions } from './getDirs'

export const getModelFiles = async () => {
  const functions = await getFunctions(true)
  const data = []
  for (const functionName of functions) {
    const httpRoutingPath = path.join(
      '.',
      'functions',
      functionName,
      'src',
      'models',
    )

    let files = await readdir(httpRoutingPath)
    files = files
      .map((fileName) => path.join(httpRoutingPath, fileName))
      .filter((file) => !file.includes('/src/models/lib'))

    data.push({ functionName, modelsPath: files })
  }
  return data
}
