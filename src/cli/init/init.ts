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
  syncArmor,
  getZone,
} from '@/cli'
import { execSyncCmd } from '@/lib/execSyncCmd'
import { FUNCTIONS_PATH, SKEET_CONFIG_PATH } from '@/lib/getSkeetConfig'
import fs from 'fs'
import { execSync } from 'child_process'

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

export const init = async (skipSetupCloud = false) => {
  const skeetConfig = await importConfig()
  if (await computeEngineDisabled()) {
    return 'Compute engine API is not enabled. Please enable compute engine on the GCP project to continue (gcloud services enable compute.googleapis.com).'
  }
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
        Logger.sync(`👷 setting up your skeet...`)
        await addRegionToConfig(region.region)
        inquirer.prompt(questions).then(async (answer) => {
          const answers = JSON.parse(JSON.stringify(answer))
          if (!skipSetupCloud) {
            await setupCloud(skeetConfig, answers.githubRepo, region.region)
          }

          await setupLoadBalancer(
            skeetConfig,
            answers.lbDomain,
            answers.nsDomain
          )
          await addDomainToConfig(answers.nsDomain, answers.lbDomain)
          await initArmor(skeetConfig.app.projectId, skeetConfig.app.name)
          await syncArmor()
          await getZone(skeetConfig.app.projectId, skeetConfig.app.name)
          await Logger.sync(
            `Copy nameServer's addresses above and paste them to your DNS settings`
          )

          await Logger.success(
            `✔︎ created Load Balancer!\nhttps will be ready in about an hour after your DNS settings 🎉`
          )
        })
      }
    })
}

export const setupCloud = async (
  skeetConfig: SkeetCloudConfig,
  repoName: string,
  region: string
) => {
  await Logger.sync(`setting up your google cloud platform...`)
  await setGcloudProject(skeetConfig.app.projectId)
  await gitInit()
  await gitCommit()
  await createGitRepo(repoName)
  await setupGcp(skeetConfig, region)
  const shCmd = ['firebase', 'deploy', '--only', 'functions']
  await execSyncCmd(shCmd)
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

export const addRegionToConfig = async (region: string) => {
  const skeetConfig: SkeetCloudConfig = await importConfig()

  skeetConfig.app.region = region
  fs.writeFileSync(
    `${FUNCTIONS_PATH}/openai/.env`,
    `PROJECT_ID=${skeetConfig.app.name}\nREGION=${region}`
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

export const computeEngineDisabled = async () => {
  try {
    const stdout = execSync(
      `gcloud services list | grep compute.googleapis.com`
    )
    return stdout.toString().trim() === ''
  } catch (error) {
    console.error(`computeEngineEnabled: ${error}`)
  }
}
