import { getModels } from '@/lib'
import { getSQLs } from '@/lib/files/getSQLs'
import { crud } from '@/templates/sql/crud'
import { routing } from '@/templates/sql/routing'
import { readdirSync, writeFileSync } from 'fs'
import inquirer from 'inquirer'
import { addIndexToSqlIndex } from './addIndexToSqlIndex'
import { toPascalCase } from '@/utils/string'
import chalk from 'chalk'

export const genScaffoldAll = async () => {
  const sqlName = await askSqlName()
  const newModels = getNewModels(sqlName)
  if (newModels.length === 0) {
    console.log('No new models found')
    return
  }
  console.log('New models found:', newModels)
  for await (const modelName of newModels) {
    await genScaffold(sqlName, modelName)
  }
}

export const askSqlName = async () => {
  const sqlNames = getSQLs()
  const answer = await inquirer.prompt<{ sqlName: string }>([
    {
      type: 'list',
      name: 'sqlName',
      message: 'Select the sql name',
      choices: sqlNames,
    },
  ])
  return answer.sqlName
}

export const genScaffold = async (sqlName: string, modelName: string) => {
  const { filePath, body } = crud(sqlName, modelName)
  writeFileSync(filePath, body)
  console.log(chalk.white(`✔ successfully created - ${filePath}`))
  const route = routing(sqlName, modelName)
  writeFileSync(route.filePath, route.body)
  console.log(chalk.white(`✔ successfully created - ${route.filePath}`))
  await addIndexToSqlIndex(sqlName, modelName)
}

export const getNewModels = (sqlName: string) => {
  const currentModels = getCurrentModels(sqlName)
  const prismaModels = getModels(sqlName)
  const newMoldes = prismaModels.filter((x) => currentModels.indexOf(x) === -1)
  return newMoldes
}

export const getCurrentModels = (sqlName: string) => {
  const currentModels = readdirSync(`./sql/${sqlName}/src/models`, {
    withFileTypes: true,
  })
    .filter((item) => item.isFile())
    .map((item) => toPascalCase(item.name.replace('.ts', '')))

  return currentModels
}
