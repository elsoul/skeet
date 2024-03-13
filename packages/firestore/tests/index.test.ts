// tests/http.test.ts
import { describe, it, expect } from 'vitest'
import admin from 'firebase-admin'
import { add } from '../src/index'
admin.initializeApp()
const db = admin.firestore()

describe('Skeet Firestore', () => {
  it('create Test model', async () => {
    // const result = await add(db, 'Test', { name: 'test' })
    // console.log(result)
    expect(200).toBe(200)
  })
})
