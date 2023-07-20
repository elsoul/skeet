import { FIREBASE_CONFIG_PATH, Logger } from '@/lib'
import { readFileSync, writeFileSync } from 'fs'

export const updateFirebaseJson = async (appDisplayName: string) => {
  const firebaseJson = readFileSync(FIREBASE_CONFIG_PATH)
  const newFirebaseJson = JSON.parse(String(firebaseJson))
  if (!newFirebaseJson.hosting) {
    newFirebaseJson.hosting = []
  }
  const hosting = {
    target: appDisplayName,
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
  writeFileSync(FIREBASE_CONFIG_PATH, JSON.stringify(newFirebaseJson, null, 2))
  Logger.successCheck('Successfully Updated firebase.json')
}
