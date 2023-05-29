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
} from '@/cli'
import { execSyncCmd } from '@/lib/execSyncCmd'
import { FUNCTIONS_PATH, SKEET_CONFIG_PATH } from '@/lib/getSkeetConfig'
import fs from 'fs'
import { execSync } from 'child_process'
import { genFirebaseConfig } from './genFirebaseConfig'

export const init = async () => {
  let projectId = ''
  const projectInquirer = inquirer.prompt(InitQuestions.projectQuestions)
  await projectInquirer.then(async (answer) => {
    projectId = answer.projectId
  })

  if (await projectIdNotExists(projectId))
    Logger.projectIdNotExistsError(projectId)

  await firebaseUseAdd(projectId)

  const regionInquirer = inquirer.prompt(InitQuestions.regionQuestions)

  await regionInquirer.then(async (region) => {
    if (!region) throw new Error('region is undefined')

    await addProjectRegion(region.region, projectId)
    const skeetConfig = await importConfig()

    Logger.confirmIfFirebaseSetupLog(projectId)
    await InitQuestions.checkIfFirebaseSetup(projectId)
    await genFirebaseConfig(projectId)

    if (region.isNeedDomain !== 'no') {
      const domainInquirer = inquirer.prompt(InitQuestions.domainQuestions)
      await domainInquirer.then(async (domainAnswer) => {
        await setupCloud(skeetConfig, domainAnswer.githubRepo, region.region)
        await runVpcNat(projectId, skeetConfig.app.name, region)
        await genGithubActions()
        // firebase deploy
        await firebaseDeploy(projectId)

        await setupLoadBalancer(
          skeetConfig,
          domainAnswer.lbDomain,
          domainAnswer.nsDomain
        )
        await initArmor()
        await syncArmors()
        await getZone(projectId, skeetConfig.app.name)
        Logger.dnsSetupLog()
      })
    } else {
      // firebase deploy
      await firebaseDeploy(projectId)
    }
  })
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

  if(await checkRepoExists(repoName)) {
    Logger.warning(`⚠️ Repository ${repoName} already exists. Please choose a new repository name. ⚠️\n`)
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

const firebaseDeploy = async (projectId: string) => {
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

export const initLb = async () => {
  const skeetConfig: SkeetCloudConfig = await importConfig()
  const domainInquirer = inquirer.prompt(InitQuestions.domainQuestions)
  await domainInquirer.then(async (domainAnswer) => {
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
    await genGithubActions()
    // firebase deploy
    await firebaseDeploy(skeetConfig.app.projectId)

    await setupLoadBalancer(
      skeetConfig,
      domainAnswer.lbDomain,
      domainAnswer.nsDomain
    )
    await initArmor()
    await syncArmors()
    await getZone(skeetConfig.app.projectId, skeetConfig.app.name)
    Logger.dnsSetupLog()
  })
}
