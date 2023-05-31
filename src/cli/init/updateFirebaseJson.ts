import { FIREBASE_CONFIG_PATH } from '@/lib/getSkeetConfig'
import { Logger } from '@/lib/logger'
import fs from 'fs'

export const updateFirebaseJson = async (projectId: string) => {
  const firebaseJson = fs.readFileSync(FIREBASE_CONFIG_PATH)
  const newFirebaseJson = JSON.parse(String(firebaseJson))
  if (!newFirebaseJson.hosting) {
    newFirebaseJson.hosting = []
  }
  const hosting = {
    target: projectId,
    public: 'web-build',
    ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
    rewrites: [
      {
        source: '**',
        destination: '/index.html',
      },
    ],
  }
  newFirebaseJson.hosting.push(hosting)
  fs.writeFileSync(
    FIREBASE_CONFIG_PATH,
    JSON.stringify(newFirebaseJson, null, 2)
  )
  Logger.successCheck('Successfully Updated firebase.json')
}
