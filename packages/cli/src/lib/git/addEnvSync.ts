import { addEnv } from '@/lib/git/addEnv'

export const addEnvSync = async (fileContent: string) => {
  const lines = fileContent.split('\n')

  for (const line of lines) {
    const key_and_value = line.match(/([A-Z_]+)="?([^"]*)"?/)
    if (key_and_value) {
      const envKey = key_and_value[1].replace(/\r?\n/g, '')
      const envValue = key_and_value[2].replace(/\r?\n/g, '')
      await addEnv(envKey, envValue)
    }
  }
}
