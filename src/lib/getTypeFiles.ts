import * as fs from 'fs'
import * as path from 'path'
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
      'http'
    )
    const files = fs
      .readdirSync(httpRoutingPath)
      .filter((fileName) => fileName !== 'index.ts')
    data.push({ functionName, modelsPath: files })
  }
  return data
}
