// tests/file.test.ts
import { describe, it, expect } from 'vitest'
import { getSQLs } from '@/lib/files/getSQLs'
import { getAllApps } from '@/lib/files/getAllApps'
import { getFunctions } from '@/lib/files/getFunctions'

describe('Method: getFunctions/getSQLs', () => {
  it('should return functions array', async () => {
    const functions = await getFunctions()

    // return Functions Name array
    expect(functions).toBeInstanceOf(Array)
  })

  it('should return SQL Apps array', async () => {
    const functions = await getSQLs()

    // return SQL App Name array
    expect(functions).toBeInstanceOf(Array)
  })

  it('should return All Apps array', async () => {
    const functions = await getAllApps()

    // return SQL App Name array
    expect(functions).toBeInstanceOf(Array)
  })
})
