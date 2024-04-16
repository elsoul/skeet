import prompt from 'prompt'
import { getNetworkConfig } from '@/lib'
import { spawnSync } from 'node:child_process'

export const runSqlUserCreate = async (projectId: string, appName: string) => {
  const dbPassPrompt = {
    properties: {
      userName: {
        description: 'Enter DB User Name',
        replace: '*',
      },
      password: {
        description: 'Enter DB User Password',
        hidden: true,
        replace: '*',
      },
      passwordConfirm: {
        description: 'Confirm Password',
        hidden: true,
        replace: '*',
      },
    },
  }
  let userPass = ''
  prompt.start()
  prompt.get(dbPassPrompt, async (err, result) => {
    if (result.password !== result.passwordConfirm) {
      console.log('password does not match!')
    } else {
      const password = String(result.password)
      const userName = String(result.userName)
      await createSqlUser(projectId, appName, userName, password)
      userPass = password
    }
  })
  return userPass
}

export const createSqlUser = async (
  projectId: string,
  appName: string,
  userName: string,
  password: string,
) => {
  const instanceName = getNetworkConfig(projectId, appName).instanceName
  const shCmd = [
    'gcloud',
    'sql',
    'users',
    'create',
    userName,
    '--instance',
    instanceName,
    '--password',
    `"${password}"`,
    '--project',
    projectId,
  ]
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit' })
}
