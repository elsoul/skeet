import {
  Logger,
  importConfig,
  firebaseUseAdd,
  firebaseLogin,
  setupActions,
  createLoadBalancer,
  isSQLexists,
  setupCloud,
  enableAiPermissions,
  createServiceAccount,
  runAiRole,
  setupNetwork,
  getZone,
} from '@/lib'
import { addFirebaseApp } from '../sub/add/addFirebaseApp'
import { yarnBuild } from '../yarn/yarnBuild'
import { firebaseFunctionsDeploy } from '../deploy/firebaseDeploy'
import { deployRules } from '../deploy/deployRules'
import { deployGraphql } from '../deploy/deployGraphql'
import { syncRunUrl } from '../sub/sync/syncRunUrl'
import { setupSQL } from '@/lib/setup/setupSQL'
import {
  DomainAnswer,
  askForGithubRepo,
  askForSqlPassword,
} from './askQuestions'
import { addProjectRegionToSkeetOptions } from '@/lib/files/addJson'
import { genGithubActions } from '../gen'
import { projectIdNotExists } from '@/lib/gcloud/billing/checkBillingAccount'
import { DEFAULT_FUNCTION_NAME, FIREBASERC_PATH } from '@/index'
import { syncRoutings } from '../sub/sync/syncRoutings'
import inquirer from 'inquirer'
import { questionList } from './questionList'
import { spawnSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'

export type initialParams = {
  projectId: string
  fbProjectId: string
  region: string
}

export const init = async (loginMode = false) => {
  // Setup Google Cloud Project
  const { projectId, fbProjectId, region } =
    await inquirer.prompt<initialParams>(questionList.projectQuestions)
  if (await projectIdNotExists(projectId))
    Logger.projectIdNotExistsError(projectId)

  updateFirebaserc(fbProjectId)

  if (!region) throw new Error('region is undefined')

  // Setup Firebase Project
  await firebaseLogin()
  await firebaseUseAdd(fbProjectId)
  await addProjectRegionToSkeetOptions(
    region,
    projectId,
    fbProjectId,
    DEFAULT_FUNCTION_NAME,
  )
  const defaultAppDisplayName = fbProjectId
  await addFirebaseApp(fbProjectId, defaultAppDisplayName)
  const { app } = importConfig()
  await createServiceAccount(projectId, app.name)
  await enableAiPermissions(projectId)
  await runAiRole(projectId, app.name)
  if (loginMode) return

  const skeetConfig = importConfig()
  await Logger.confirmFirebaseSetup(fbProjectId, skeetConfig.app.template)

  const githubRepo = await askForGithubRepo()

  let domainAnswer: DomainAnswer = {
    isDomain: false,
    appDomain: '',
    nsDomain: '',
    lbDomain: '',
  }

  let sqlPassword = ''
  const hasGraphQL = skeetConfig.app.template.includes('GraphQL')

  if (hasGraphQL && !(await isSQLexists())) {
    sqlPassword = await askForSqlPassword()
  }

  // Ask Domain info if LB is not exists
  if (!skeetConfig.app.hasLoadBalancer) {
    domainAnswer = await inquirer.prompt<DomainAnswer>(
      questionList.domainQuestions,
    )
  }

  // Setup Cloud
  await setupCloud(skeetConfig, githubRepo, skeetConfig.app.region)

  // Setup Network
  await setupNetwork()

  // Setup Cloud SQL
  if (sqlPassword !== '') await setupSQL(skeetConfig, sqlPassword)

  // Deploy Default Firebase Functions
  await yarnBuild(DEFAULT_FUNCTION_NAME)
  await firebaseFunctionsDeploy(skeetConfig.app.fbProjectId)
  await deployRules(skeetConfig.app.fbProjectId)

  // Create Github Actions
  await genGithubActions()

  // Deploy GraphQL if template includes GraphQL
  if (hasGraphQL) {
    await deployGraphql(skeetConfig)
    await syncRunUrl()
    await setupActions()
  }
  // Create Load Balancer if not exists
  if (!skeetConfig.app.hasLoadBalancer) {
    await createLoadBalancer(skeetConfig, domainAnswer)
    await syncRoutings()
    const cmd = `yarn deploy`
    spawnSync(cmd, { stdio: 'inherit', shell: true })
    const ips = await getZone(projectId, skeetConfig.app.name)
    Logger.dnsSetupLog(ips)
  } else {
    const cmd = `yarn deploy`
    spawnSync(cmd, { stdio: 'inherit', shell: true })
  }
}

const updateFirebaserc = (fbProjectId: string) => {
  const firebaserc = JSON.parse(readFileSync(FIREBASERC_PATH, 'utf-8'))
  firebaserc.projects.default = fbProjectId
  writeFileSync(FIREBASERC_PATH, JSON.stringify(firebaserc, null, 2))
}
