import { initializeApp } from 'firebase/app'
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import dotenv from 'dotenv'
import { Logger, importConfig } from '@/lib'
dotenv.config()

export const login = async (
  email = 'EpicsDAO@epics.dev',
  password = 'ELSOUL-LABO-B.V.'
) => {
  try {
    const configPath = process.env.FIREBASE_CONFIG_PATH
    if (configPath === undefined) {
      await firebaseConfigLogExport()
      process.exit(0)
    }

    const firebaseConfig = await import(`${configPath}.mjs`)
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
    const { app } = await importConfig()
    app.template.includes('GraphQL')
      ? graphqlLogExport(accessToken)
      : firestoreLogExport(accessToken)
    return true
  } catch (error) {
    throw new Error(`login: ${error}`)
  }
}

export const firestoreLogExport = async (accessToken: string) => {
  Logger.warning('🚸 === Copy & Paste below command to your terminal === 🚸\n')
  const exportLog = `export ACCESS_TOKEN=${accessToken}\n`
  Logger.normal(exportLog)
  Logger.warning('🚸 =========           END           ========= 🚸\n\n')

  const successLog = `💃Let's try \`$ skeet curl <MethodName>\` to test request🕺\n`
  Logger.normal(successLog)
  const curlText =
    '$ skeet curl createUserChatRoom\n     or     \n$ skeet curl createUserChatRoom --data \'{ "model": "gpt-3.5-turbo", "maxTokens": 420 }\''
  Logger.normal(curlText)
}

export const graphqlLogExport = async (accessToken: string) => {
  Logger.warning('🚸 === Copy & Paste below command to your terminal === 🚸\n')
  const exportLog = `export ACCESS_TOKEN=${accessToken}\n`
  Logger.normal(exportLog)
  Logger.warning('🚸 =========           END           ========= 🚸\n\n')

  // const successLog = `💃Let's try \`$ skeet post <QueryType>\` to test request🕺\n`
  // Logger.normal(successLog)
  // const curlText =
  //   '$ skeet post mutation -q createChatRoom\n     or     \n$ skeet post mutation -q createChatRoom -b \'{ "model": "gpt-3.5-turbo", "maxTokens": 420 }\' -r \'id,model\''
  // Logger.normal(curlText)
}

export const firebaseConfigLogExport = async () => {
  Logger.warning('🚸 === Copy & Paste below command to your terminal === 🚸\n')
  const exportLog = `export FIREBASE_CONFIG_PATH=${process.cwd()}/lib/firebaseConfig\n`
  Logger.normal(exportLog)
  Logger.warning('🚸 =========           END           ========= 🚸\n\n')

  const successLog = `💃Let's try \`$ skeet login\` to get test token\n`
  Logger.normal(successLog)
}
