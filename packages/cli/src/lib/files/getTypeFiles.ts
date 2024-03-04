import { readdir } from 'fs/promises'
import path from 'path'
import { getFunctions } from './getDirs'

export const getTypeFiles = async () => {
  const functions = await getFunctions()
  const data = []
  for (const functionName of functions) {
    const httpRoutingPath = path.join(
      '.',
      'functions',
      functionName,
      'src',
      'types',
      'http',
    )
    const files = await readdir(httpRoutingPath)
    const modelsPath = files.filter((fileName) => fileName !== 'index.ts')
    data.push({ functionName, modelsPath })
  }
  return data
}
