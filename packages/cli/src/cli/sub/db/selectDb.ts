import { readdir } from 'fs/promises'
import inquirer from 'inquirer'

type SelectDbOptions = {
  db: string[]
}

export const selectDb = async () => {
  const sqlDirs = await readdir('./sql', { withFileTypes: true })
  const choices = sqlDirs
    .filter((item) => item.isDirectory())
    .map((item) => item.name)
  const answer = await inquirer.prompt<SelectDbOptions>([
    {
      type: 'checkbox',
      message: 'Select Database',
      name: 'db',
      choices,
    },
  ])
  return answer.db
}
