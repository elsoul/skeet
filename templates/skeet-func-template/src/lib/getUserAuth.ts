import { Request } from 'firebase-functions/v2/https'
import { getAuth } from 'firebase-admin/auth'
import { gravatarIconUrl } from '@skeet-framework/utils'

// Assuming `firebase-admin` is initialized elsewhere in your application.
// If not, you might need to do it here with an appropriate import and initialization code.

export type UserAuthType = {
  uid: string
  username: string
  email: string
  iconUrl: string
}

export const getUserAuth = async (req: Request): Promise<UserAuthType> => {
  try {
    const token = req.headers.authorization
    if (token === 'undefined' || token == null)
      throw new Error('Invalid token!')
    const bearer = token.split('Bearer ')[1]
    const user = await getAuth().verifyIdToken(bearer) // Adjusted method call for ESM
    const { uid, displayName, email, photoURL } = user
    const response: UserAuthType = {
      uid,
      username: displayName || email?.split('@')[0] || '',
      email: email || '',
      iconUrl:
        photoURL === '' || !photoURL
          ? gravatarIconUrl(email ?? 'info@skeet.dev')
          : photoURL,
    }
    return response
  } catch (error) {
    throw new Error(`getUserAuth: ${error}`)
  }
}
