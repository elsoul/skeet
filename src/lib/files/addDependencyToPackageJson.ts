import { readFileSync, writeFileSync } from 'fs'

export function addDependencyToPackageJson(
  packageJsonPath: string,
  dependencyName: string,
  version: string,
) {
  try {
    // package.jsonを読み込む
    const packageJsonContent = readFileSync(packageJsonPath, 'utf8')
    const packageJson = JSON.parse(packageJsonContent)

    // 依存関係を追加する
    packageJson.dependencies = packageJson.dependencies || {}
    packageJson.dependencies[dependencyName] = version

    // package.jsonを更新する
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8')
    console.log(`Dependency "${dependencyName}" added to package.json.`)
  } catch (error) {
    console.error(`addDependencyToPackageJson: ${error}`)
    throw new Error(`addDependencyToPackageJson: ${error}`)
  }
}
