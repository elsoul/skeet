import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { firebaseGetSecret } from '@/lib/firebase/firebaseGetSecret'
import { execAsync } from '@skeet-framework/utils'

export const dbMigrate = async (cwd: string, production: boolean = false) => {
  try {
    const prismaMigrateCmd = production
      ? ['npx', 'dotenv', '-e', `.env.build`, 'npx', 'prisma', 'migrate', 'dev']
      : ['npx', 'prisma', 'migrate', 'dev']

    if (production) {
      if (!(await checkFileDirExists('.env.build'))) {
        let dbKey = cwd.split('/').pop()
        dbKey = dbKey?.toUpperCase().replaceAll('-', '_')
        const key = `DATABASE_BUILD_URL_${dbKey}`
        const value = await firebaseGetSecret(key)
        if (value) {
          await execAsync(`echo "DATABASE_URL=${value}" > .env.build`, cwd)
        }
      }
    } else {
      if (!(await checkFileDirExists('.env'))) {
        let dbKey = cwd.split('/').pop()
        dbKey = dbKey?.toUpperCase().replaceAll('-', '_')
        const dbKeyLowercase = dbKey?.toLowerCase()
        const value = `postgresql://skeeter:rabbit@localhost:5432/dev-${dbKeyLowercase}?schema=public\n`
        if (value) {
          await execAsync(`echo "DATABASE_URL=${value}" > .env`, cwd)
        }
      }
    }

    return await execAsync(prismaMigrateCmd.join(' '), cwd)
  } catch (error) {
    throw new Error(`Error initializing database: ${error}`)
  }
}
