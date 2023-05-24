import { FirebaseOptions, initializeApp } from 'firebase/app'
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import dotenv from 'dotenv'
import { Logger } from '@/lib/logger'
dotenv.config()

export const login = async (
  email = 'EpicsDAO@epics.dev',
  password = 'ELSOUL-LABO-B.V.',
  isInitial = true
) => {
  try {
    // @ts-ignore
    const firebaseConfig = (await import(
      `./lib/firebaseConfig`
    )) as FirebaseOptions
    // @ts-ignore
    const firebaseApp = initializeApp(firebaseConfig.default)
    const auth = getAuth(firebaseApp)
    const SkeetEnv = process.env.NODE_ENV || 'development'
    if (SkeetEnv === 'development')
      connectAuthEmulator(auth, 'http://127.0.0.1:9099')

    if (isInitial) await createUserWithEmailAndPassword(auth, email, password)
    const loginUserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    // @ts-ignore
    const accessToken = loginUserCredential.user.accessToken
    Logger.warning(
      '🚸 === Copy & Paste below commands to your terminal === 🚸\n'
    )
    const exportLog = `export ACCESS_TOKEN=${accessToken}\n`
    Logger.normal(exportLog)
    Logger.warning('🚸 =========           END           ========= 🚸\n\n')

    const curlDescription = `Example POST Request to create UserChatRoom\n`
    Logger.sync(curlDescription)
    const curlText = 'run `skeet curl createUserChatRoom`'
    Logger.normal(curlText)
    return true
  } catch (error) {
    throw new Error(`login: ${error}`)
  }
}
