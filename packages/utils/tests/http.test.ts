// tests/http.test.ts
import { describe, it, expect } from 'vitest'
import { sendGet } from '@/lib/http/sendGet'

describe('Skeet Utils - Http Methods', () => {
  it('check sendGet', async () => {
    // Ping google.com to check if the method works
    const response = await sendGet('https://google.com')
    expect(response.status).toBe(200)
  })
})
