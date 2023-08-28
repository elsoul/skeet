import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import * as semver from 'semver'
import inquirer from 'inquirer'
import { ROUTE_PACKAGE_JSON_PATH } from '@/lib'

export async function getChangeLog(): Promise<string> {
  try {
    const log = execSync(
      `git log $(git describe --tags --abbrev=0)..HEAD --oneline --pretty=format:"- %s"`
    ).toString()
    return log
  } catch (error) {
    return ''
  }
}

export const release = async (npmPublish = false) => {
  const packageJson = JSON.parse(readFileSync(ROUTE_PACKAGE_JSON_PATH, 'utf8'))
  const currentVersion = packageJson.version

  const responses = await inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: 'SelectVersion:',
      choices: [
        {
          name: `PatchUpdate: ${semver.inc(currentVersion, 'patch')}`,
          value: 'patch',
        },
        {
          name: `MinorUpdate: ${semver.inc(currentVersion, 'minor')}`,
          value: 'minor',
        },
        {
          name: `MajorUpdate: ${semver.inc(currentVersion, 'major')}`,
          value: 'major',
        },
      ],
    },
  ])

  const newVersion = semver.inc(
    currentVersion,
    responses.version as semver.ReleaseType
  )
  packageJson.version = newVersion!
  writeFileSync(ROUTE_PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2))
  execSync(`yarn build`)
  execSync(`git add .`)
  execSync(`git commit -m "update: release v${newVersion}"`)
  execSync(`git push origin main`)
  execSync(`git tag v${newVersion}`)
  execSync(`git push origin v${newVersion}`)
  console.log(`Updated to ${newVersion} and created git tag 🎉`)

  const changeLog = await getChangeLog()
  console.log(changeLog)
  execSync(`gh release create v${newVersion} --notes "${changeLog}"`)
  console.log(`gh v${newVersion} release created 🎉`)
  if (npmPublish) {
    execSync(`npm publish`)
    console.log(`npm published 🎉`)
  }
}
