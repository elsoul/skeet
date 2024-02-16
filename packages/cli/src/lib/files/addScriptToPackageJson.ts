import { readFileSync, writeFileSync } from 'fs'

export function addScriptToPackageJson(
  jsonPath: string,
  scriptName: string,
  scriptValue: string,
) {
  try {
    const packageJsonContent = readFileSync(jsonPath, 'utf8')
    const packageJson = JSON.parse(packageJsonContent)
    packageJson.scripts = packageJson.scripts || {}
    packageJson.scripts[scriptName] = scriptValue

    writeFileSync(jsonPath, JSON.stringify(packageJson, null, 2), 'utf8')
    console.log(`Script "${scriptName}" added to package.json.`)
  } catch (error) {
    console.error(`addScriptToPackageJson: ${error}`)
    throw new Error(`addScriptToPackageJson: ${error}`)
  }
}
