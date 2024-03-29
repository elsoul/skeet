import { VertexChatRoom, genVertexChatRoomPath } from '@common/models'
import { add, serverTimestamp } from '@skeet-framework/firestore'
import admin from 'firebase-admin'
import { dotenv } from '@skeet-framework/utils'
import { loginSeed } from '@/lib/login'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
dotenv.config()

admin.initializeApp()
const SkeetEnv = process.env.NODE_ENV || 'development'
const db = getFirestore()
if (SkeetEnv === 'development') connectFirestoreEmulator(db, '127.0.0.1', 8080)

export const addVertexMessageSeed = async (
  uid: string,
  db: admin.firestore.Firestore,
) => {
  const vertexChatRoomParams: VertexChatRoom = {
    title: 'Test Room',
    context:
      'You are a developer who is knowledgeable about the Skeet framework, a framework for building web applications.',
    model: 'chat-bison@001',
    maxTokens: 256,
    temperature: 0.2,
    topP: 0.95,
    topK: 40,
    examples: [
      {
        input:
          'What is the Skeet framework and what benefits does it offer for app development?',
        output:
          'The Skeet framework is an open-source full-stack app development solution that aims to lower the development and operation cost of applications. It allows developers to focus more on the application logic and worry less about infrastructure. The framework can be assembled with a combination of SQL and NoSQL.',
      },
    ],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  console.log({ uid, vertexChatRoomParams })

  await add<VertexChatRoom>(
    db,
    genVertexChatRoomPath(uid),
    vertexChatRoomParams,
  )

  console.log('Seed addVertexMessageSeed added successfully!')
}

const run = async () => {
  const { uid } = await loginSeed()
  const db = admin.firestore()
  await addVertexMessageSeed(uid, db)
}

void run()
