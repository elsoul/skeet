import { readFile, writeFile } from 'fs/promises'

export async function addDependencyToPackageJson(
  packageJsonPath: string,
  dependencyName: string,
  version: string,
) {
  try {
    // package.jsonを読み込む
    const packageJsonContent = await readFile(packageJsonPath, 'utf8')
    const packageJson = JSON.parse(packageJsonContent)

    // 依存関係を追加する
    packageJson.dependencies = packageJson.dependencies || {}
    packageJson.dependencies[dependencyName] = version

    // package.jsonを更新する
    await writeFile(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      'utf8',
    )
    console.log(`Dependency "${dependencyName}" added to package.json.`)
  } catch (error) {
    console.error(`addDependencyToPackageJson: ${error}`)
    throw new Error(`addDependencyToPackageJson: ${error}`)
  }
}
