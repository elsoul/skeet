import { readFile, writeFile } from 'fs/promises'

export const updatePackageJsonName = async (name: string, jsonPath: string) => {
  const packageJson = JSON.parse(await readFile(jsonPath, 'utf-8'))
  packageJson.name = name
  packageJson.projectId = name
  await writeFile(jsonPath, JSON.stringify(packageJson, null, 2))
}
