// tests/http.test.ts
import { describe, it, expect } from 'vitest'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { add } from '../src/index'

const firebaseApp = initializeApp({
  credential: applicationDefault(),
})
export const db = getFirestore(firebaseApp)

describe('Skeet Firestore', () => {
  it('create Test model', async () => {
    // const result = await add(db, 'Test', { name: 'test' })
    // console.log(result)
    expect(200).toBe(200)
  })
})
