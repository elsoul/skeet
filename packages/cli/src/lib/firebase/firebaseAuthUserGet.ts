import { PATH } from '@/config/path'
import { execSyncCmd } from '../execSyncCmd'

export const firebaseAuthUserGet = (
  projectId: string,
  path = PATH.FIREBASE_USERS as string,
) => {
  try {
    const cmd = ['firebase', 'auth:export', path, '--project', projectId]
    execSyncCmd(cmd)
  } catch (error) {
    throw new Error(`firebaseAuthUserGet: ${error}`)
  }
}
