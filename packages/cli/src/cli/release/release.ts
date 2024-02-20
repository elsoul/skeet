import { existsSync, readFileSync, writeFileSync } from 'fs'
import { execSync, spawnSync } from 'child_process'
import * as semver from 'semver'
import inquirer from 'inquirer'
import { ROUTE_PACKAGE_JSON_PATH } from '@/lib'
import { sleep } from '@/utils/time'

export const VERSION_FILE = './src/lib/version.ts'

export function getChangeLog() {
  try {
    const remoteURL = execSync('git remote get-url origin').toString().trim()

    console.log(`remoteURL: ${remoteURL}`)
    const matchResult = remoteURL.match(
      /github\.com[/:]([^/]+)\/([^/]+?)(?:\.git)?$/,
    )
    console.log(`matchResult: ${matchResult}`)
    if (!matchResult) {
      throw new Error('Could not extract repository owner and name.')
    }

    const repositoryOwner = matchResult[1]
    const repositoryName = matchResult[2]

    const log = execSync(
      `git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"- %s by @%an in #%h"`,
    ).toString()
    const lines = log.split('\n')
    const githubCommitURL = `https://github.com/${repositoryOwner}/${repositoryName}/commit`
    const formattedLines = lines.map((line) => {
      if (line.startsWith('Merge pull request')) {
        return line
      } else {
        return line.replace(/#(\w+)/g, (match) => {
          const shortHash = match.substring(1)
          return `${githubCommitURL}/${shortHash}`
        })
      }
    })
    const formattedLog = formattedLines.join('\n')

    return `## What's Changed\n\n${formattedLog}`
  } catch (error) {
    console.log(`Error in getChangeLog: ${error}`)
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
    responses.version as semver.ReleaseType,
  )
  packageJson.version = newVersion!
  writeFileSync(ROUTE_PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2))
  if (existsSync(VERSION_FILE)) updateVersionFile(newVersion!)
  await sleep(100)
  spawnSync(`pnpm build`, { stdio: 'inherit', shell: true })
  spawnSync(`git add .`, { stdio: 'inherit', shell: true })
  spawnSync(`git commit -m "update: release v${newVersion}"`, {
    stdio: 'inherit',
    shell: true,
  })
  spawnSync(`git push origin main`, { stdio: 'inherit', shell: true })
  const changeLog = getChangeLog()
  console.log(`changeLog: ${changeLog}`)
  spawnSync(`git tag v${newVersion}`, { stdio: 'inherit', shell: true })
  spawnSync(`git push origin v${newVersion}`, { stdio: 'inherit', shell: true })
  console.log(`Updated to ${newVersion} and created git tag 🎉`)
  spawnSync(`gh release create v${newVersion} --notes "${changeLog}"`, {
    stdio: 'inherit',
    shell: true,
  })
  console.log(`gh v${newVersion} release created 🎉`)
  if (npmPublish) {
    spawnSync(`pnpm publish`, { stdio: 'inherit', shell: true })
    console.log(`pnpm published 🎉`)
  }
}

export const updateVersionFile = (newVersion: string) => {
  const versionString = `export const VERSION = '${newVersion}'`
  writeFileSync(VERSION_FILE, versionString, {
    flag: 'w',
  })
}
