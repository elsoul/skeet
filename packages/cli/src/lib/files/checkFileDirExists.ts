import { access } from 'fs/promises'

export async function checkFileDirExists(path: string) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}
