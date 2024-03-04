import { execSyncCmd } from '@/lib'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'

export const genGithubActions = async () => {
  try {
    const actionsPath = `./.github`
    if (await checkFileDirExists(actionsPath)) {
      console.log('Github Actions already exists.')
      return
    }
    const cmd = ['mv', `./github`, actionsPath]
    await execSyncCmd(cmd)
  } catch (error) {
    console.log(error)
  }
}
