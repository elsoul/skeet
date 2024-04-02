import { DOCKER_DB_NAME, DOCKER_DB_PASS, DOCKER_DB_USER } from '@/config/config'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { firebaseGetSecret } from '@/lib/firebase/firebaseGetSecret'
import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'
import { spawnSync } from 'node:child_process'

export const dbMigrate = async (cwd: string, production: boolean = false) => {
  try {
    const prismaMigrateCmd = production
      ? [
          'npx',
          'dotenv-cli',
          '-e',
          `.env.build`,
          '--',
          'npx',
          'prisma',
          'migrate',
          'dev',
        ]
      : ['npx', 'prisma', 'migrate', 'dev']

    if (production) {
      if (!(await checkFileDirExists(cwd + '/.env.build'))) {
        let dbKey = cwd.split('/').pop()
        dbKey = dbKey?.toUpperCase().replaceAll('-', '_')
        const key = `DATABASE_BUILD_URL_${dbKey}`
        const value = await firebaseGetSecret(key)
        if (value) {
          await execAsync(`echo "DATABASE_URL=${value}" > .env.build`, cwd)
        } else {
          console.log(
            chalk.yellow(
              `⚠️ Please make sure the secret ${key} exists in Firebase Secrets\nYou can set it by running\n\nskeet add secret`,
            ),
          )
          return
        }
      }
    } else {
      if (!(await checkFileDirExists(cwd + '/.env'))) {
        console.log(chalk.yellow(`⚠️ No .env file found`))
        let dbKey = cwd.split('/').pop()
        dbKey = dbKey?.toUpperCase().replaceAll('-', '_')
        const dbKeyLowercase = dbKey?.toLowerCase()
        const value = `postgresql://${DOCKER_DB_USER}:${DOCKER_DB_PASS}@localhost:5432/${DOCKER_DB_NAME}?schema=public`
        await execAsync(`echo "DATABASE_URL=${value}" > .env`, cwd)
      }
    }

    spawnSync(prismaMigrateCmd[0], prismaMigrateCmd.slice(1), {
      cwd,
      stdio: 'inherit',
      shell: true,
    })
    return true
  } catch (error) {
    throw new Error(`Error initializing database: ${error}`)
  }
}
