import { execAsync } from '@skeet-framework/utils'

export const dbMigrate = async (cwd: string, production: boolean = false) => {
  try {
    const prismaMigrateCmd = production
      ? ['npx', 'dotenv', '-e', `.env.build`, 'npx', 'prisma', 'migrate', 'dev']
      : ['npx', 'prisma', 'migrate', 'dev']
    return await execAsync(prismaMigrateCmd.join(' '), cwd)
  } catch (error) {
    throw new Error(`Error initializing database: ${error}`)
  }
}
