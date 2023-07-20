import inquirer from 'inquirer'
import {
  Logger,
  importConfig,
  initArmor,
  setupGcp,
  setupLoadBalancer,
  setGcloudProject,
  gitInit,
  gitCommit,
  checkRepoExists,
  createGitRepo,
  getZone,
  firebaseUseAdd,
  runVpcNat,
  enablePermission,
  addRole,
  createServiceAccount,
  firebaseLogin,
  SKEET_CONFIG_PATH,
  copyFileWithOverwrite,
} from '@/lib'
import { execSync } from 'child_process'
import * as fileDataOf from '@/templates/init'
import { addFirebaseApp } from '../sub/add/addFirebaseApp'
import { InitQuestions } from './initQuestions'
import { yarnBuild } from '../yarn/yarnBuild'
import { firebaseFunctionsDeploy } from '../deploy/firebaseDeploy'
import { deployRules } from '../deploy/deployRules'
import { syncArmors } from '../sub/sync/syncArmors'
import { readFileSync, writeFileSync } from 'fs'
import { SkeetCloudConfig } from '@/types/skeetTypes'

export const init = async (isOnlyDev = false) => {
  const { projectId, region } = await askForProjectId()
  if (await projectIdNotExists(projectId))
    Logger.projectIdNotExistsError(projectId)

  if (!region) throw new Error('region is undefined')
  await firebaseLogin()

  const defaultFunctionName = 'openai'
  await firebaseUseAdd(projectId)
  await addProjectRegionToSkeetOptions(region, projectId, defaultFunctionName)
  const defaultAppDisplayName = projectId
  await addFirebaseApp(projectId, defaultAppDisplayName)
  await copyDefaultFirebaseConfig(defaultAppDisplayName)
  const firebaserc = await fileDataOf.firebasercInit(projectId)
  writeFileSync(firebaserc.filePath, firebaserc.body)
  if (isOnlyDev) return

  await setupProject(projectId)
  const isNeedDomain = await askForNeedDomain()
  await setupCloudIfNeeded(isNeedDomain)
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

export const enableBillingIam = async (projectId: string) => {
  const billingService = 'billing.accounts.get'
  await enablePermission(projectId, billingService)
}

export const addBillingRole = async (projectId: string, appName: string) => {
  const billingRole = 'billing.resourceAssociations.list'
  await addRole(projectId, appName, billingRole)
}

export const checkBillingAccount = async (
  projectId: string,
  appName: string
) => {
  try {
    await createServiceAccount(projectId, appName)
    const cmd = `gcloud beta billing projects describe ${projectId}`
    const { promisify } = require('util')
    const exec = promisify(require('child_process').exec)

    const output = await exec(cmd)

    if (output.stderr.trim() !== '') {
      console.log(output.stderr.trim())
      return false
    }

    // Extracting 'billingEnabled' value from output
    const lines = output.stdout.split('\n')
    for (const line of lines) {
      if (line.startsWith('billingEnabled:')) {
        const billingEnabled = line.split(':')[1].trim() === 'true' // getting the value after ':' and converting it to boolean
        return billingEnabled
      }
    }

    console.error('No billingEnabled info found')
    return false
  } catch (error) {
    return false
  }
}
export const setupCloud = async (
  skeetConfig: SkeetCloudConfig,
  repoName: string,
  region: string
) => {
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
  if (skeetConfig.app.template === 'Expo (React Native)') {
    addAppJson(repoName)
  }
  await setupGcp(skeetConfig, region)
}

const addAppJson = (repoName: string) => {
  const filePath = `./app.json`
  const appJson = readFileSync(filePath)
  const newAppJson = JSON.parse(String(appJson))
  newAppJson.expo.githubUrl = `https://github.com/${repoName}`
  writeFileSync(filePath, JSON.stringify(newAppJson, null, 2))
  Logger.successCheck(`Successfully Updated ${filePath}`)
}

export const addDomainToConfig = async (
  nsDomain: string,
  lbDomain: string,
  functionName: string
) => {
  const skeetConfig: SkeetCloudConfig = await importConfig()
  const skeetOptionsFile = `./functions/${functionName}/skeetOptions.json`
  const jsonFile = readFileSync(skeetOptionsFile)
  const newJsonFile = JSON.parse(String(jsonFile))
  newJsonFile.nsDomain = nsDomain
  newJsonFile.lbDomain = lbDomain
  writeFileSync(skeetOptionsFile, JSON.stringify(newJsonFile, null, 2))

  skeetConfig.app.appDomain = nsDomain
  skeetConfig.app.lbDomain = lbDomain
  writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  Logger.success('Successfully Updated skeet-cloud.config.json!')
}

export const addProjectRegionToSkeetOptions = async (
  region: string,
  projectId: string,
  functionName: string
) => {
  const skeetConfig: SkeetCloudConfig = await importConfig()

  skeetConfig.app.region = region
  skeetConfig.app.projectId = projectId

  const filePath = `./functions/${functionName}/skeetOptions.json`
  const jsonFile = readFileSync(filePath)
  const newJsonFile = JSON.parse(String(jsonFile))
  newJsonFile.name = skeetConfig.app.name
  newJsonFile.projectId = skeetConfig.app.projectId
  newJsonFile.region = skeetConfig.app.region
  writeFileSync(filePath, JSON.stringify(newJsonFile, null, 2))
  writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  Logger.successCheck('Successfully Updated skeet-cloud.config.json')
}

const askForProjectId = async () => {
  const projectInquirer = inquirer.prompt(InitQuestions.projectQuestions)
  let projectId = ''
  let region = ''
  await projectInquirer.then(async (answer) => {
    projectId = answer.projectId
    region = answer.region
  })
  return { projectId, region }
}

const askForNeedDomain = async () => {
  const needDomainInquirer = inquirer.prompt(InitQuestions.needDomainQuestions)
  let isNeedDomain = 'no'
  await needDomainInquirer.then(async (needDomainAnswer) => {
    isNeedDomain = needDomainAnswer.isNeedDomain
  })
  return isNeedDomain
}

const setupProject = async (projectId: string) => {
  Logger.confirmIfFirebaseSetupLog(projectId)
  await InitQuestions.checkIfFirebaseSetup(projectId)
}

const setupCloudIfNeeded = async (isNeedDomain: string) => {
  const skeetConfig = await importConfig()
  if (isNeedDomain !== 'no') {
    const domainAnswer = await askForDomain()
    const defaultFunctionName = 'openai'
    await addDomainToConfig(
      domainAnswer.nsDomain,
      domainAnswer.lbDomain,
      defaultFunctionName
    )
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
    await yarnBuild('openai')
    await firebaseFunctionsDeploy(skeetConfig.app.projectId)
    await deployRules(skeetConfig.app.projectId)
    await setupLoadBalancer(
      skeetConfig,
      domainAnswer.lbDomain,
      domainAnswer.nsDomain
    )
    await additionalSetup(skeetConfig.app.projectId, skeetConfig.app.name)
  } else {
    await firebaseFunctionsDeploy(skeetConfig.app.projectId)
    await deployRules(skeetConfig.app.projectId)
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
  await initArmor()
  await syncArmors()
  const ips = await getZone(projectId, appName)
  Logger.dnsSetupLog(ips)
}

const copyDefaultFirebaseConfig = async (appDisplayName: string) => {
  const originalFirebaseConfigPath = `./lib/firebaseAppConfig/${appDisplayName}.ts`
  const defaultFirebaseConfigPath = `./lib/firebaseConfig.ts`
  await copyFileWithOverwrite(
    originalFirebaseConfigPath,
    defaultFirebaseConfigPath
  )
}
