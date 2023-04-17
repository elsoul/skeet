import { execSync } from 'child_process'

export const listFunctions = async () => {
  try {
    const shCmd = ['firebase', 'functions:list']
    execSync(shCmd.join(' '), { stdio: 'inherit' })
  } catch (error) {
    throw new Error(`listFunctions: ${error}`)
  }
}
