import { execSync } from 'child_process'

export const skeetTest = async () => {
  try {
    const cmd = `yarn test`
    execSync(cmd, { stdio: 'inherit' })
  } catch (error) {
    throw new Error(`skeetTest: ${error}`)
  }
}
