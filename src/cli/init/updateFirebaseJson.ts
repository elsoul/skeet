import { FIREBASE_CONFIG_PATH } from '@/lib/getSkeetConfig'
import { Logger } from '@/lib/logger'
import fs from 'fs'

export const updateFirebaseJson = async (projectId: string) => {
  const firebaseJson = fs.readFileSync(FIREBASE_CONFIG_PATH)
  const newFirebaseJson = JSON.parse(String(firebaseJson))
  newFirebaseJson.hosting.target = projectId
  newFirebaseJson.hosting.public = 'web-build'
  newFirebaseJson.hosting.ignore = [
    'firebase.json',
    '**/.*',
    '**/node_modules/**',
  ]
  newFirebaseJson.hosting.rewrites = [
    {
      source: '**',
      destination: '/index.html',
    },
  ]
  fs.writeFileSync(
    FIREBASE_CONFIG_PATH,
    JSON.stringify(newFirebaseJson, null, 2)
  )
  Logger.successCheck('Successfully Updated firebase.json')
}
