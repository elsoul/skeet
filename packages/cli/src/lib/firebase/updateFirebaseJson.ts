import { FIREBASE_CONFIG_PATH, Logger } from '@/lib'
import { readFile, writeFile } from 'fs/promises'

export const updateFirebaseJson = async (appDisplayName: string) => {
  const firebaseJson = await readFile(FIREBASE_CONFIG_PATH)
  const newFirebaseJson = JSON.parse(String(firebaseJson))
  if (!newFirebaseJson.hosting) {
    newFirebaseJson.hosting = []
  }
  const hosting = {
    target: appDisplayName,
    public: 'web-build',
    ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
  }
  newFirebaseJson.hosting.push(hosting)
  await writeFile(
    FIREBASE_CONFIG_PATH,
    JSON.stringify(newFirebaseJson, null, 2),
  )
  Logger.successCheck('Successfully Updated firebase.json')
}
