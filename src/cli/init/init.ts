import inquirer from 'inquirer'
import { Logger } from '@/lib/logger'
import { importConfig, SkeetCloudConfig } from '@/index'
import {
  initArmor,
  setupGcp,
  setupLoadBalancer,
  setGcloudProject,
  gitInit,
  gitCryptInit,
  gitCommit,
  createGitRepo,
  syncArmor,
  getZone,
} from '@/cli'

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

export const init = async () => {
  const skeetConfig = await importConfig()
  inquirer.prompt(questions).then(async (answer) => {
    const answers = JSON.parse(JSON.stringify(answer))
    // await setupCloud(skeetConfig, answers.githubRepo)
    const functionName = 'hello'
    await setupLoadBalancer(
      skeetConfig,
      answers.lbDomain,
      answers.nsDomain,
      functionName
    )
    await initArmor(skeetConfig.api.projectId, skeetConfig.api.appName)
    await syncArmor()
    await getZone(skeetConfig.api.projectId, skeetConfig.api.appName)
    await Logger.sync(
      `Copy nameServer's addresses above and paste them to your DNS settings`
    )

    await Logger.success(
      `✔︎ created Load Balancer!\nhttps will be ready in about an hour after your DNS settings 🎉`
    )
  })
}

export const apiRunDeploy = async (skeetConfig: SkeetCloudConfig) => {}

export const setupCloud = async (
  skeetConfig: SkeetCloudConfig,
  repoName: string
) => {
  await Logger.sync(`setting up your google cloud platform...`)
  await setGcloudProject(skeetConfig.api.projectId)
  await gitInit()
  await gitCryptInit()
  await gitCommit()
  await createGitRepo(repoName)
  await setupGcp(skeetConfig)
}
