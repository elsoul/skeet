import { existsSync, readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import * as semver from 'semver'
import inquirer from 'inquirer'
import { ROUTE_PACKAGE_JSON_PATH } from '@/lib'

const VERSION_FILE = './src/lib/version.ts'

export async function getChangeLog() {
  try {
    const remoteURL = execSync('git remote get-url origin').toString().trim()

    // URLからリポジトリの所有者（ユーザー名）とリポジトリ名を抽出
    const matchResult = remoteURL.match(/github\.com\/([^/]+)\/([^/]+)\.git$/)
    if (matchResult) {
      const repositoryOwner = matchResult[1]
      const repositoryName = matchResult[2]

      const log = execSync(
        `git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"%s by @%an in #%h"`
      ).toString()

      // 正規表現を使用してショートハッシュを抽出し、URLに変換
      const commitHashes = log.match(/#(\w+)/g)

      if (commitHashes) {
        const githubCommitURL = `https://github.com/${repositoryOwner}/${repositoryName}/commit`
        const formattedLog = log.replace(/#(\w+)/g, (match) => {
          const shortHash = match.substring(1) // #を削除
          return `${githubCommitURL}/${shortHash}`
        })

        console.log(formattedLog)
        return `## What's Changed\n\n${formattedLog}`
      } else {
        throw new Error('No commit hashes found in the log.')
      }
    } else {
      throw new Error(
        'Could not extract repository owner and name from the remote URL.'
      )
    }
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
