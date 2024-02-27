import { toCamelCase } from '@skeet-framework/utils'
import chalk from 'chalk'
import { readFile, writeFile } from 'fs/promises'

export const addIndexToSqlIndex = async (
  sqlName: string,
  newModelName: string,
) => {
  const modelNameLower = newModelName.toLowerCase()
  const modelNameCamel = toCamelCase(newModelName)
  const filePath = `./sql/${sqlName}/src/index.ts`
  const fileBodyArray = (await readFile(filePath, 'utf-8')).split('\n')
  // find the 'from '@/routes/' line
  const fromRoutesIndex = fileBodyArray.findIndex((line) =>
    line.includes("from '@/routes/'"),
  )
  // insert the new import line under the 'from '@/routes/' line
  const newLine = `import { ${modelNameCamel}Router } from '@/routes/${modelNameCamel}'`
  fileBodyArray.splice(fromRoutesIndex + 1, 0, newLine)

  // find the 'app.route(rootDir' line
  const appRouteIndex = fileBodyArray.findIndex((line) =>
    line.includes('app.route(rootDir'),
  )
  const newRouteLine = `app.route(rootDir + '/${modelNameCamel}s', ${modelNameCamel}Router)`
  fileBodyArray.splice(appRouteIndex + 1, 0, newRouteLine)

  // write the new file body
  await writeFile(filePath, fileBodyArray.join('\n'))
  console.log(
    chalk.white(`✔️ Added ${modelNameLower} to ./sql/${sqlName}/src/index.ts`),
  )
}
