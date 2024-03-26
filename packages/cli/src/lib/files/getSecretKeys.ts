import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import inquirer from 'inquirer'

export const getSecretKeys = async () => {
  const config = await readOrCreateConfig()
  const answer = await inquirer.prompt<{ secretKeys: string[] }>([
    {
      type: 'checkbox',
      name: 'secretKeys',
      message: 'Select secret keys',
      choices: config.secretKey,
    },
  ])
  return answer.secretKeys
}
