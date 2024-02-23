import { GRAPHQL_PATH } from '@/index'
import { existsSync, readdirSync } from 'fs'
import inquirer from 'inquirer'

export const selectDb = async () => {
  let hasGraphql = false
  if (existsSync(GRAPHQL_PATH)) {
    hasGraphql = true
  }
  const sqlDirs = readdirSync('./sql', { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
  const choices = sqlDirs
  if (hasGraphql) {
    choices.push('GraphQL')
  }
  const answer = await inquirer.prompt<{ db: string[] }>([
    {
      type: 'checkbox',
      message: 'Select Database',
      name: 'db',
      choices,
    },
  ])
  return answer.db
}
