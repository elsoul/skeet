import { readdirSync } from 'fs'
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
      'models'
    )
    let files = readdirSync(httpRoutingPath).map(
      (fileName) => httpRoutingPath + '/' + fileName
    )

    files = files.filter((file) => !file.includes('/src/models/lib'))

    data.push({ functionName, modelsPath: files })
  }
  return data
}
