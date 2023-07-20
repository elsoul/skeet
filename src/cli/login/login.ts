import { FirebaseOptions, initializeApp } from 'firebase/app'
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import dotenv from 'dotenv'
import { Logger } from '@/lib'
dotenv.config()

export const login = async (
  email = 'EpicsDAO@epics.dev',
  password = 'ELSOUL-LABO-B.V.'
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

    let loginUserCredential = null
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      loginUserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
    } catch (error) {
      // console.log(error.code)
    }
    loginUserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    // @ts-ignore
    const accessToken = loginUserCredential.user.accessToken
    Logger.warning(
      '🚸 === Copy & Paste below command to your terminal === 🚸\n'
    )
    const exportLog = `export ACCESS_TOKEN=${accessToken}\n`
    Logger.normal(exportLog)
    Logger.warning('🚸 =========           END           ========= 🚸\n\n')

    const successLog = `💃Let's try \`$ skeet curl <MethodName>\` to test request🕺\n`
    Logger.normal(successLog)
    const curlText =
      '$ skeet curl createUserChatRoom\n     or     \n$ skeet curl createUserChatRoom --data \'{ "model": "gpt-4-32k", "maxTokens": 4200 }\''
    Logger.normal(curlText)
    return true
  } catch (error) {
    throw new Error(`login: ${error}`)
  }
}
