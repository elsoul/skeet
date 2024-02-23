import { mkdirSync, readdirSync } from 'fs'
import path from 'path'

export const getFunctions = () => {
  const functionsDir = path.join(process.cwd(), 'functions')
  if (!functionsDir) {
    mkdirSync(functionsDir)
  }
  console.log(functionsDir)
  const functions = readdirSync(functionsDir)
  return functions
}
