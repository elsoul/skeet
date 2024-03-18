import { PATH } from '@/config/path'
import { execAsyncCmd } from '../execAsyncCmd'

export const firebaseAuthUserGet = (
  projectId: string,
  path = PATH.FIREBASE_USERS as string,
) => {
  try {
    const cmd = ['firebase', 'auth:export', path, '--project', projectId]
    execAsyncCmd(cmd)
  } catch (error) {
    throw new Error(`firebaseAuthUserGet: ${error}`)
  }
}
