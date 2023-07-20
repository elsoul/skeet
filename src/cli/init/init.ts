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
  addEnvSync,
  setupActions,
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
import { deployGraphql } from '../deploy/deployGraphql'
import { initSql } from './initSql'
import { sqlIp } from '../sql'
import { addIp } from '../sub/add/addIp'
import { dbDeploy } from '../sub/db/dbDeploy'
import { GRAPHQL_ENV_PRODUCTION_PATH } from '@/index'
import { syncRunUrl } from '../sub/sync/syncRunUrl'

export const init = async (isOnlyDev = false) => {
  const { projectId, fbProjectId, region } = await askForProjectId()
  if (await projectIdNotExists(projectId))
    Logger.projectIdNotExistsError(projectId)

  if (!region) throw new Error('region is undefined')
  await firebaseLogin()

  const defaultFunctionName = 'skeet'
  await firebaseUseAdd(fbProjectId)
  await addProjectRegionToSkeetOptions(
    region,
    projectId,
    fbProjectId,
    defaultFunctionName
  )
  const defaultAppDisplayName = fbProjectId
  await addFirebaseApp(fbProjectId, defaultAppDisplayName)
  await copyDefaultFirebaseConfig(defaultAppDisplayName)
  const firebaserc = await fileDataOf.firebasercInit(fbProjectId)
  writeFileSync(firebaserc.filePath, firebaserc.body)
  if (isOnlyDev) return

  await setupProject(fbProjectId)
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
  appDomain: string,
  nsDomain: string,
  lbDomain: string,
  functionName: string
) => {
  const skeetConfig: SkeetCloudConfig = await importConfig()
  const skeetOptionsFile = `./functions/${functionName}/skeetOptions.json`
  const jsonFile = readFileSync(skeetOptionsFile)
  const newJsonFile = JSON.parse(String(jsonFile))
  newJsonFile.appDomain = appDomain
  newJsonFile.nsDomain = nsDomain
  newJsonFile.lbDomain = lbDomain
  writeFileSync(skeetOptionsFile, JSON.stringify(newJsonFile, null, 2))

  skeetConfig.app.appDomain = appDomain
  newJsonFile.nsDomain = nsDomain
  skeetConfig.app.lbDomain = lbDomain
  writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  Logger.success('Successfully Updated skeet-cloud.config.json!')
}

export const addProjectRegionToSkeetOptions = async (
  region: string,
  projectId: string,
  fbProjectId: string,
  functionName: string
) => {
  const skeetConfig: SkeetCloudConfig = await importConfig()

  skeetConfig.app.region = region
  skeetConfig.app.projectId = projectId
  skeetConfig.app.fbProjectId = fbProjectId

  const filePath = `./functions/${functionName}/skeetOptions.json`
  const jsonFile = readFileSync(filePath)
  const newJsonFile = JSON.parse(String(jsonFile))
  newJsonFile.name = skeetConfig.app.name
  newJsonFile.projectId = skeetConfig.app.projectId
  newJsonFile.fbProjectId = skeetConfig.app.fbProjectId
  newJsonFile.region = skeetConfig.app.region
  writeFileSync(filePath, JSON.stringify(newJsonFile, null, 2))
  writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  Logger.successCheck('Successfully Updated skeet-cloud.config.json')
}

const askForProjectId = async () => {
  const projectInquirer = inquirer.prompt(InitQuestions.projectQuestions)
  let projectId = ''
  let fbProjectId = ''
  let region = ''
  await projectInquirer.then(async (answer) => {
    projectId = answer.projectId
    region = answer.region
    fbProjectId = answer.fbProjectId
  })
  return { projectId, region, fbProjectId }
}

export const askForSqlPassword = async () => {
  const sqlPasswordInquirer = inquirer.prompt(
    InitQuestions.sqlPasswordQuestions
  )
  let sqlPassword = ''
  await sqlPasswordInquirer.then(async (sqlPasswordAnswer) => {
    if (sqlPasswordAnswer.password1 !== sqlPasswordAnswer.password2)
      throw new Error("password doesn't match!")
    sqlPassword = sqlPasswordAnswer.password1
  })
  return sqlPassword
}

export const askForGithubRepo = async () => {
  const githubRepoInquirer = inquirer.prompt(InitQuestions.githubRepoQuestions)
  let githubRepo = ''
  await githubRepoInquirer.then(async (githubAnswer) => {
    githubRepo = githubAnswer.githubRepo
  })
  return githubRepo
}

const askForNeedDomain = async () => {
  const needDomainInquirer = inquirer.prompt(InitQuestions.needDomainQuestions)
  let isNeedDomain = 'no'
  await needDomainInquirer.then(async (needDomainAnswer) => {
    isNeedDomain = needDomainAnswer.isNeedDomain
  })
  return isNeedDomain
}

const setupProject = async (fbProjectId: string) => {
  Logger.confirmIfFirebaseSetupLog(fbProjectId)
  await InitQuestions.checkIfFirebaseSetup(fbProjectId)
}

const setupCloudIfNeeded = async (isNeedDomain: string) => {
  const skeetConfig = await importConfig()
  const githubRepo = await askForGithubRepo()
  const sqlPassword = await askForSqlPassword()
  await setupCloud(skeetConfig, githubRepo, skeetConfig.app.region)
  await runVpcNat(
    skeetConfig.app.projectId,
    skeetConfig.app.name,
    skeetConfig.app.region
  )
  await initSql(skeetConfig, sqlPassword)
  await sqlIp()
  await addIp()
  await dbDeploy(true)
  await addEnvSync(GRAPHQL_ENV_PRODUCTION_PATH)
  await yarnBuild('skeet')
  await firebaseFunctionsDeploy(skeetConfig.app.fbProjectId)
  await deployRules(skeetConfig.app.fbProjectId)
  await deployGraphql(skeetConfig)
  await syncRunUrl()
  await genGithubActions()
  await setupActions()
  if (isNeedDomain !== 'no') {
    const domainAnswer = await askForDomain()
    const defaultFunctionName = 'skeet'
    await addDomainToConfig(
      domainAnswer.appDomain,
      domainAnswer.nsDomain,
      domainAnswer.lbDomain,
      defaultFunctionName
    )
    await setupLoadBalancer(
      skeetConfig,
      domainAnswer.lbDomain,
      domainAnswer.nsDomain
    )
    await setupArmor(skeetConfig.app.projectId, skeetConfig.app.name)
  }
}

export const askForDomain = async () => {
  const domainInquirer = inquirer.prompt(InitQuestions.domainQuestions)
  let isDomain = false
  let appDomain = ''
  let nsDomain = ''
  let lbDomain = ''
  await domainInquirer.then(async (domain) => {
    isDomain = domain.isDomain
    appDomain = domain.appDomain
    nsDomain = domain.nsDomain
    lbDomain = domain.lbDomain
  })
  return { isDomain, appDomain, nsDomain, lbDomain }
}

const setupArmor = async (projectId: string, appName: string) => {
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
