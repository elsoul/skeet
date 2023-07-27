import { execSync } from 'child_process'

export const genGithubActions = async () => {
  try {
    const cmd = ['mv', `./github`, `./.github`]
    execSync(cmd.join(' '))
  } catch (error) {
    console.log(error)
  }
}
