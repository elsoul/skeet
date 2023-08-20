import { GRAPHQL_ROOT } from '@/index'
import chalk from 'chalk'
import { spawnSync } from 'child_process'

export const dbMigrate = async (name: string, production: boolean = false) => {
  try {
    const prismaMigrateCmd = production
      ? [
          'dotenv',
          '-e',
          `.env.build`,
          'npx',
          'prisma',
          'migrate',
          'dev',
          '--name',
          name,
        ]
      : ['npx', 'prisma', 'migrate', 'dev', '--name', name]
    spawnSync(prismaMigrateCmd[0], prismaMigrateCmd.slice(1), {
      cwd: GRAPHQL_ROOT,
      stdio: 'inherit',
    })
    console.log(chalk.white(`\nThen run: `), chalk.green(`$ skeet g scaffold`))
  } catch (error) {
    throw new Error(`Error initializing database: ${error}`)
  }
}
