// tests/http.test.ts
import { describe, it, expect } from 'vitest'
import { sendGet } from '@/lib/http/sendGet'
import { sendPost } from '@/lib'

interface GetResponse {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: User[]
  support: Support
}

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

interface Support {
  url: string
  text: string
}

interface PostResponse {
  id: string
  token: string
}

describe('Skeet Utils - Http Methods', () => {
  it('sendGet returns GetResponse', async () => {
    // GET request to fetch users
    const url = 'https://reqres.in/api/users'
    type QueryParamsType = { page: number }
    const queryParams = { page: 2 }
    const response = await sendGet<QueryParamsType, GetResponse>(
      url,
      queryParams,
    )
    expect(response.page).toBe(2)
  })

  it('sendPost returns PostResponse', async () => {
    // POST request to register a user
    const url = 'https://reqres.in/api/register'
    type BodyType = { email: string; password: string }
    const body = { email: 'eve.holt@reqres.in', password: 'pistol' } // 成功する登録情報
    const response = await sendPost<BodyType, PostResponse>(url, body)

    // Check if the response has the expected keys
    const expectedKeys: (keyof PostResponse)[] = ['id', 'token']
    expectedKeys.forEach((key) => {
      expect(response).toHaveProperty(key)
    })
  })
})
