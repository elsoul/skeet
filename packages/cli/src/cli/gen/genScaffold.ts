import { getModels } from '@/lib'
import { getSQLs } from '@/lib/files/getSQLs'
import { crud } from '@/templates/sql/crud'
import { routing } from '@/templates/sql/routing'
import { readdir, writeFile } from 'fs/promises'
import inquirer from 'inquirer'
import { addIndexToSqlIndex } from './addIndexToSqlIndex'
import { toPascalCase } from '@/utils/string'
import chalk from 'chalk'

export const genScaffoldAll = async () => {
  const sqlName = await askSqlName()
  const newModels = await getNewModels(sqlName)
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
  const sqlNames = await getSQLs()
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
  await writeFile(filePath, body)
  console.log(chalk.white(`✔ successfully created - ${filePath}`))
  const route = routing(sqlName, modelName)
  await writeFile(route.filePath, route.body)
  console.log(chalk.white(`✔ successfully created - ${route.filePath}`))
  await addIndexToSqlIndex(sqlName, modelName)
}

export const getNewModels = async (sqlName: string) => {
  const currentModels = await getCurrentModels(sqlName)
  const prismaModels = await getModels(sqlName)
  const newMoldes = prismaModels.filter((x) => currentModels.indexOf(x) === -1)
  return newMoldes
}

export const getCurrentModels = async (sqlName: string) => {
  const currentModels = await readdir(`./sql/${sqlName}/src/models`, {
    withFileTypes: true,
  })
  const result = currentModels
    .filter((item) => item.isFile())
    .filter((item) => item.isFile())
    .map((item) => toPascalCase(item.name.replace('.ts', '')))

  return result
}
