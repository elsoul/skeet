import { existsSync, readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import * as semver from 'semver'
import inquirer from 'inquirer'
import { ROUTE_PACKAGE_JSON_PATH } from '@/lib'

const VERSION_FILE = './src/lib/version.ts'

export async function getChangeLog(): Promise<string> {
  try {
    const log = execSync(
      `git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"%s by @%an in #%h"`
    ).toString()
    return `## What's Changed\n\n${log}`
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
  if (existsSync(VERSION_FILE)) updateVersionFile(newVersion!)
  execSync(`yarn build`)
  execSync(`git add .`)
  execSync(`git commit -m "update: release v${newVersion}"`)
  execSync(`git push origin main`)

  const changeLog = await getChangeLog()
  console.log(`changeLog: ${changeLog}`)

  execSync(`git tag v${newVersion}`)
  execSync(`git push origin v${newVersion}`)
  console.log(`Updated to ${newVersion} and created git tag 🎉`)

  execSync(`gh release create v${newVersion} --notes "${changeLog}"`)
  console.log(`gh v${newVersion} release created 🎉`)
  if (npmPublish) {
    execSync(`npm publish`)
    console.log(`npm published 🎉`)
  }
}

const updateVersionFile = (newVersion: string) => {
  const versionString = `export const VERSION = '${newVersion}'`
  writeFileSync(VERSION_FILE, versionString, {
    flag: 'w',
  })
}
