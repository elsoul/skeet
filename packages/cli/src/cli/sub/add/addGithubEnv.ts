import { addEnv } from '@/lib'
import inquirer from 'inquirer'

export const addGithubEnv = async (key: string) => {
  try {
    const keyAndValue = await inquirer.prompt<{ value: string }>([
      {
        type: 'password',
        name: 'value',
        message: 'Enter the GitHub Secret Value',
        mask: '*',
        validate: (input: string) => {
          if (input.length === 0) {
            return 'Please enter a value'
          }
          return true
        },
      },
    ])
    void (await addEnv(key, keyAndValue.value))
    return true
  } catch (error) {
    throw new Error(`addGithubEnv: ${error}`)
  }
}
