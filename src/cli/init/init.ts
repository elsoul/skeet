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
  checkRepoExists,
  createGitRepo,
  syncArmors,
  getZone,
  firebaseUseAdd,
  runVpcNat,
  InitQuestions,
  addFirebaseApp,
} from '@/cli'
import { execSyncCmd } from '@/lib/execSyncCmd'
import { FUNCTIONS_PATH, SKEET_CONFIG_PATH } from '@/lib/getSkeetConfig'
import fs from 'fs'
import { execSync } from 'child_process'

export const init = async (isOnlyDev = false) => {
  const projectId = await askForProjectId()
  if (await projectIdNotExists(projectId))
    Logger.projectIdNotExistsError(projectId)

  await firebaseUseAdd(projectId)
  const defaultAppDisplayName = projectId
  await addFirebaseApp(defaultAppDisplayName)
  if (isOnlyDev) return

  const region = await askForRegion()
  if (!region) throw new Error('region is undefined')

  await setupProject(region.region, projectId)
  await setupCloudIfNeeded(region.isNeedDomain)
}

export const genGithubActions = async () => {
  try {
    const cmd = ['mv', `./github`, `./.github`]
    execSync(cmd.join(' '))
  } catch (error) {
    console.log(error)
  }
}

export const projectIdNotExists = async (projectId: string) => {
  if (projectId.length < 4) return false

  const cmd = `gcloud projects list --filter ${projectId}`
  const { promisify } = require('util')
  const exec = promisify(require('child_process').exec)

  const output = await exec(cmd)
  console.log(output.stderr.trim())
  return output.stderr.trim() !== ''
}

export const setupCloud = async (
  skeetConfig: SkeetCloudConfig,
  repoName: string,
  region: string
) => {
  Logger.sync(`setting up your google cloud platform...`)
  await setGcloudProject(skeetConfig.app.projectId)

  if (await checkRepoExists(repoName)) {
    Logger.warning(
      `⚠️ Repository ${repoName} already exists. Please choose a new repository name. ⚠️\n`
    )
    process.exit(0)
  }
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

export const addProjectRegion = async (region: string, projectId: string) => {
  const skeetConfig: SkeetCloudConfig = await importConfig()

  skeetConfig.app.region = region
  skeetConfig.app.projectId = projectId

  fs.writeFileSync(
    `${FUNCTIONS_PATH}/openai/.env`,
    `SKEET_APP_NAME=${skeetConfig.app.name}\nPROJECT_ID=${projectId}\nREGION=${region}`
  )
  fs.writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  Logger.successCheck('Successfully Updated skeet-cloud.config.json')
}

export const firebaseDeploy = async (projectId: string) => {
  try {
    const shCmd = [
      'firebase',
      'deploy',
      '--only',
      'functions',
      '-P',
      `${projectId}`,
    ]
    await execSyncCmd(shCmd)
  } catch (error) {
    throw new Error(`firebaseDeploy: ${error}`)
  }
}

const askForProjectId = async () => {
  const projectInquirer = inquirer.prompt(InitQuestions.projectQuestions)
  let projectId = ''
  await projectInquirer.then(async (answer) => {
    projectId = answer.projectId
  })
  return projectId
}

const askForRegion = async () => {
  const regionInquirer = inquirer.prompt(InitQuestions.regionQuestions)
  let region = 'europe-west6'
  let isNeedDomain = 'no'
  await regionInquirer.then(async (regionAnswer) => {
    region = regionAnswer.region
    isNeedDomain = regionAnswer.isNeedDomain
  })
  return { region, isNeedDomain }
}

const setupProject = async (region: string, projectId: string) => {
  await addProjectRegion(region, projectId)
  Logger.confirmIfFirebaseSetupLog(projectId)
  await InitQuestions.checkIfFirebaseSetup(projectId)
}

const setupCloudIfNeeded = async (isNeedDomain: string) => {
  const domainAnswer = await askForDomain()
  const skeetConfig = await importConfig()
  if (isNeedDomain !== 'no') {
    await setupCloud(
      skeetConfig,
      domainAnswer.githubRepo,
      skeetConfig.app.region
    )
    await runVpcNat(
      skeetConfig.app.projectId,
      skeetConfig.app.name,
      skeetConfig.app.region
    )
    await firebaseDeploy(skeetConfig.app.projectId)
    await setupLoadBalancer(
      skeetConfig,
      domainAnswer.lbDomain,
      domainAnswer.nsDomain
    )
    await additionalSetup(skeetConfig.app.projectId, skeetConfig.app.name)
  } else {
    await firebaseDeploy(skeetConfig.app.projectId)
  }
}

const askForDomain = async () => {
  const domainInquirer = inquirer.prompt(InitQuestions.domainQuestions)
  let isDomain = false
  let githubRepo = ''
  let nsDomain = ''
  let lbDomain = ''
  await domainInquirer.then(async (domain) => {
    isDomain = domain.isDomain
    githubRepo = domain.githubRepo
    nsDomain = domain.nsDomain
    lbDomain = domain.lbDomain
  })
  return { isDomain, githubRepo, nsDomain, lbDomain }
}

const additionalSetup = async (projectId: string, appName: string) => {
  await genGithubActions()
  await firebaseDeploy(projectId)
  await initArmor()
  await syncArmors()
  await getZone(projectId, appName)
  Logger.dnsSetupLog()
}
