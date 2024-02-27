import { readFile, writeFile } from 'fs/promises'

export const addIndexToSqlIndex = async (
  sqlName: string,
  newModelName: string,
) => {
  const modelNameLower = newModelName.toLowerCase()
  const filePath = `./sql/${sqlName}/src/index.ts`
  const fileBodyArray = (await readFile(filePath, 'utf-8')).split('\n')
  // find the 'from '@/routes/' line
  const fromRoutesIndex = fileBodyArray.findIndex((line) =>
    line.includes("from '@/routes/'"),
  )
  // insert the new import line under the 'from '@/routes/' line
  const newLine = `import { ${modelNameLower}Router } from '@/routes/${modelNameLower}'`
  fileBodyArray.splice(fromRoutesIndex + 1, 0, newLine)

  // find the 'app.route(rootDir' line
  const appRouteIndex = fileBodyArray.findIndex((line) =>
    line.includes('app.route(rootDir'),
  )
  const newRouteLine = `app.route(rootDir + '/${modelNameLower}s', ${modelNameLower}Router)`
  fileBodyArray.splice(appRouteIndex + 1, 0, newRouteLine)

  // write the new file body
  await writeFile(filePath, fileBodyArray.join('\n'))
  console.log(`✔️ Added ${modelNameLower} to ./sql/${sqlName}/src/index.ts`)
}
