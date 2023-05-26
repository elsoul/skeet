import inquirer from 'inquirer'
import { Logger } from '@/lib/logger'
import { importConfig, SkeetCloudConfig } from '@/index'
import {
  initArmor,
  setupGcp,
  setupLoadBalancer,
  setGcloudProject,
  gitInit,
  gitCommit,
  createGitRepo,
  syncArmors,
  getZone,
} from '@/cli'
import { execSyncCmd } from '@/lib/execSyncCmd'
import { FUNCTIONS_PATH, SKEET_CONFIG_PATH } from '@/lib/getSkeetConfig'
import fs from 'fs'
import { execSync } from 'child_process'
import { genFirebaseConfig } from './genFirebaseConfig'

const requireRepoName = (value: string) => {
  if (/.+\/.+/.test(value)) {
    return true
  }

  return 'This is not GitHub Repo Name!It must be repoOwner/repoName'
}

const requireDomainName = (value: string) => {
  if (/.+\..+/.test(value)) {
    return true
  }

  return 'This is not Domain Name!It must be example.com'
}

const questions = [
  {
    type: 'input',
    name: 'projectId',
    message: "What's your GCP Project ID",
    default() {
      return 'skeet-app-123456'
    },
  },
  {
    type: 'input',
    name: 'githubRepo',
    message: "What's your GitHub Repo Name",
    validate: requireRepoName,
    default() {
      return 'elsoul/skeet-app'
    },
  },
  {
    type: 'input',
    name: 'nsDomain',
    message: "What's your domain address for NameServer",
    validate: requireDomainName,
    default() {
      return 'skeet.dev'
    },
  },
  {
    type: 'input',
    name: 'lbDomain',
    message: "What's your domain address for Load Balancer",
    validate: requireDomainName,
    default() {
      return 'lb.skeet.dev'
    },
  },
]

export const projectIdNotExists = async (projectId: string) => {
  const cmd = `gcloud projects list --filter ${projectId}`
  const { promisify } = require('util')
  const exec = promisify(require('child_process').exec)

  const output = await exec(cmd)

  return output.stderr.trim() !== ''
}

export const init = async (skipSetupCloud = false) => {
  const regionsArray: Array<{ [key: string]: string }> = []
  for await (const region of regionList) {
    regionsArray.push({ name: region })
  }

  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Select Regions to deploy',
        name: 'region',
        choices: [new inquirer.Separator(' = Regions = '), ...regionsArray],
        validate(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one service.'
          }

          return true
        },
      },
    ])
    .then(async (region) => {
      if (region) {
        Logger.normal(`👷 setting up your skeet...`)

        inquirer.prompt(questions).then(async (answer) => {
          const answers = JSON.parse(JSON.stringify(answer))
          await addParamsToConfig(
            region.region,
            answers.projectId,
            answers.nsDomain,
            answers.lbDomain
          )
          const skeetConfig = await importConfig()
          if (await projectIdNotExists(skeetConfig.app.projectId)) {
            Logger.error(
              'Project ID with that name does not exist. Please check the project ID from Google Cloud. \nex) `skeet-app` might be `skeet-app-123456`.'
            )
            return
          }

          if (!skipSetupCloud) {
            await setupCloud(skeetConfig, answers.githubRepo, region.region)
            try {
              const cmd = ['mv', `./github`, `./.github`]
              execSync(cmd.join(' '))
            } catch (error) {
              console.log(error)
            }
          }
          const shCmd = [
            'firebase',
            'deploy',
            '--only',
            'functions',
            '-P',
            `${answers.projectId}`,
          ]
          await execSyncCmd(shCmd)

          await setupLoadBalancer(
            skeetConfig,
            answers.lbDomain,
            answers.nsDomain
          )
          await initArmor()
          await syncArmors()
          await getZone(answers.projectId, skeetConfig.app.name)
          Logger.warning(
            `⚠️ Copy nameServer's addresses above and paste them to your DNS settings ⚠️`
          )
          Logger.warning(
            '\n\n👷 https will be ready in about an hour after your DNS settings 👷\n\n'
          )
          Logger.successCheck(`Load Balancer has been created successfully`)
        })
      }
    })
}

export const setupCloud = async (
  skeetConfig: SkeetCloudConfig,
  repoName: string,
  region: string
) => {
  Logger.sync(`setting up your google cloud platform...`)
  await setGcloudProject(skeetConfig.app.projectId)
  await gitInit()
  await gitCommit()
  await createGitRepo(repoName)
  await setupGcp(skeetConfig, region)
}

export const addDomainToConfig = async (
  nsDomain: string,
  functionsDomain: string
) => {
  const skeetConfig: SkeetCloudConfig = await importConfig()

  skeetConfig.app.appDomain = nsDomain
  skeetConfig.app.functionsDomain = functionsDomain
  fs.writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  Logger.success('Successfully Updated skeet-cloud.config.json!')
}

export const addParamsToConfig = async (
  region: string,
  projectId: string,
  nsDomain: string,
  functionsDomain: string
) => {
  const skeetConfig: SkeetCloudConfig = await importConfig()

  skeetConfig.app.region = region
  skeetConfig.app.projectId = projectId
  skeetConfig.app.appDomain = nsDomain
  skeetConfig.app.functionsDomain = functionsDomain

  fs.writeFileSync(
    `${FUNCTIONS_PATH}/openai/.env`,
    `SKEET_APP_NAME=${skeetConfig.app.name}\nPROJECT_ID=${projectId}\nREGION=${region}`
  )
  fs.writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  Logger.success('Successfully Updated skeet-cloud.config.json!')
}

export const regionList = [
  'asia-east1',
  'asia-east2',
  'asia-northeast1',
  'asia-northeast2',
  'asia-northeast3',
  'asia-south1',
  'asia-southeast1',
  'asia-southeast2',
  'australia-southeast1',
  'europe-central2',
  'europe-west1',
  'europe-west2',
  'europe-west3',
  'europe-west6',
  'northamerica-northeast1',
  'southamerica-east1',
  'us-central1',
  'us-east1',
  'us-east4',
  'us-west1',
  'us-west2',
  'us-west3',
  'us-west4',
]
