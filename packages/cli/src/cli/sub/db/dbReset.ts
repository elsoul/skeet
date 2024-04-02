import { PATH } from '@/config/path'
import { spawnSync } from 'node:child_process'
import inquirer from 'inquirer'

type ResetComfirmation = {
  confirm: boolean
}

export const dbReset = async (
  production: boolean = false,
  cwd = './graphql' as string,
) => {
  try {
    let shCmd = []
    if (production) {
      const confirmation = await inquirer.prompt<ResetComfirmation>([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Are you sure you want to reset the database?',
          default: false,
        },
      ])
      if (!confirmation.confirm) {
        return
      }
      shCmd = [
        'npx',
        'dotenv',
        '-e',
        '.env.build',
        'npx',
        'prisma',
        'migrate',
        'reset',
      ]
    } else {
      shCmd = ['npx', 'prisma', 'migrate', 'reset']
    }
    spawnSync(shCmd[0], shCmd.slice(1), {
      cwd,
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error resetting database: ${error}`)
  }
}
