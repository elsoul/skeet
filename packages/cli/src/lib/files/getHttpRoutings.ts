import { readdir } from 'fs/promises'
import path from 'path'
import { getFunctions } from './getDirs'

export const getHttpRoutings = async () => {
  const functions = await getFunctions()
  const data = []
  for (const functionName of functions) {
    const httpRoutingPath = path.join(
      '.',
      'functions',
      functionName,
      'src',
      'routings',
      'http',
    )
    const files = await readdir(httpRoutingPath)
    const httpEndpoints = files
      .filter((fileName) => fileName.endsWith('.ts') && fileName !== 'index.ts')
      .map((fileName) => fileName.replace(/\.ts$/, ''))
    data.push({ functionName, httpEndpoints })
  }
  return data
}
