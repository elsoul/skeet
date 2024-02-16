import { execSync } from 'child_process'
import { existsSync } from 'fs'

export const genGithubActions = async () => {
  try {
    const actionsPath = `./.github`
    if (existsSync(actionsPath)) {
      console.log('Github Actions already exists.')
      return
    }
    const cmd = ['mv', `./github`, actionsPath]
    execSync(cmd.join(' '))
  } catch (error) {
    console.log(error)
  }
}
