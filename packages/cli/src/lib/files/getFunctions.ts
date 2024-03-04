import { mkdir, readdir } from 'fs/promises'
import path from 'path'

export const getFunctions = async () => {
  const functionsDir = path.join(process.cwd(), 'functions')
  if (!functionsDir) {
    await mkdir(functionsDir)
  }
  console.log(functionsDir)
  const functions = await readdir(functionsDir)
  return functions
}
