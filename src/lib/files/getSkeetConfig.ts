import { execSync } from 'child_process'
import fs from 'fs'
import { CONTAINER_REGIONS } from '@/config/region'
import { importConfig } from './importConfig'
import { FILE_NAME, PATH } from '@/config/path'

export const TYPE_PATH = './types'
export const FUNCTIONS_PATH = './functions'
export const FIREBASE_CONFIG_PATH = './firebase.json'
export const SKEET_CONFIG_PATH = './skeet-cloud.config.json'
export const ROUTE_PACKAGE_JSON_PATH = './package.json'
export const GRAPHQL_REPO_URL = 'https://github.com/elsoul/skeet-graphql'
export const FUNCTIONS_REPO_URL = 'https://github.com/elsoul/skeet-functions'
export const APP_REPO_URL = 'https://github.com/elsoul/skeet-app'
export const GRAPHQL_REPO_PATH = 'https://github.com/elsoul/skeet-graphql'
export const NEXT_REPO_URL = 'https://github.com/elsoul/skeet-next'
export const BACKEND_GRAPHQL_REPO_URL =
  'https://github.com/elsoul/skeet-graphql-only'
export const BACKEND_FUNCTIONS_REPO_URL =
  'https://github.com/elsoul/skeet-functions-only'
export const SOLANA_REPO_URL =
  'https://github.com/elsoul/skeet-solana-mobile-stack'
export const FRONT_APP_PATH = './src'
export const WEB_APP_PATH = './webapp'
export const KEYFILE_PATH = './keyfile.json'

export const getNegName = async (functionName: string) => {
  return `skeet-${functionName}-neg`
}

export const getFunctionInfo = async (functionName: string) => {
  const functionInfo = {
    name: `skeet-functions-${functionName}`,
    neg: `skeet-${functionName}-neg`,
    backendService: `skeet-${functionName}-bs`,
    armor: `skeet-${functionName}-armor`,
  }
  return functionInfo
}

export const getFunctionConfig = (functionName: string) => {
  try {
    const tsconfig = fs.readFileSync('./tsconfig.json', 'utf-8')
    const prretierrc = fs.readFileSync('.prettierrc', 'utf-8')
    const result = {
      package: readConfigFile(functionName, 'package.json'),
      tsconfig,
      prretierrc,
    }
    return result
  } catch (error) {
    throw new Error(`getFunctionConfig: ${error}`)
  }
}

const readConfigFile = (functionName: string, file: string) => {
  try {
    const path = `${FUNCTIONS_PATH}/${functionName}/${file}`
    return fs.readFileSync(path, 'utf-8')
  } catch (error) {
    return ''
  }
}

export const getNetworkConfig = async (projectId: string, appName: string) => {
  const skeetHd = 'skeet-' + appName
  return {
    projectId,
    appName,
    cloudRunName: `${skeetHd}-api`,
    instanceName: skeetHd + '-db',
    networkName: skeetHd + '-network',
    firewallTcpName: skeetHd + '-fw-tcp',
    firewallSshName: skeetHd + '-fw-ssh',
    natName: skeetHd + '-nat',
    routerName: skeetHd + '-router',
    subnetName: skeetHd + '-subnet',
    connectorName: appName + '-con',
    ipName: skeetHd + '-external-ip',
    loadBalancerIpName: skeetHd + '-lb-ip',
    ipRangeName: skeetHd + '-ip-range',
    serviceAccountName: `${appName}@${projectId}.iam.gserviceaccount.com`,
    networkEndpointGroupName: `${skeetHd}-neg`,
    defaultBackendServiceName: `${skeetHd}-default-bs`,
    backendServiceName: `${skeetHd}-bs`,
    loadBalancerName: `${skeetHd}-lb`,
    sslName: `${skeetHd}-ssl`,
    proxyName: `${skeetHd}-px`,
    forwardingRuleName: `${skeetHd}-fr`,
    zoneName: `${skeetHd}-zone`,
    securityPolicyName: `${skeetHd}-armor`,
    pathMatcherName: `${skeetHd}-pm`,
  }
}

export const getContainerRegion = (region: string) => {
  switch (region) {
    case region.match('asia')?.input:
      return CONTAINER_REGIONS.ASIA
    case region.match('eu')?.input:
      return CONTAINER_REGIONS.EU
    default:
      return CONTAINER_REGIONS.US
  }
}

export const getContainerImageUrl = async (
  projectId: string,
  appName: string,
  region: string,
  workerName: string = '',
  isPlugin: boolean = false,
) => {
  const cRegion = getContainerRegion(region)

  let imageName = ''
  if (workerName !== '' && isPlugin) {
    imageName = 'skeet-worker-' + workerName
  } else if (workerName !== '') {
    imageName = 'skeet-' + appName + '-worker-' + workerName
  } else {
    imageName = 'skeet-' + appName + '-api'
  }

  const containerProjectName = isPlugin ? 'skeet-framework' : projectId
  return cRegion + '/' + containerProjectName + '/' + imageName + ':latest'
}

export const getContainerImageName = (
  appName: string,
  workerName: string = '',
) => {
  const skeetConfig = importConfig()
  const db = skeetConfig.app.template.includes('GraphQL') ? 'graphql' : 'sql'
  const imageName =
    workerName !== ''
      ? 'skeet-' + appName + '-worker-' + workerName
      : 'skeet-' + appName + '-' + db
  return imageName
}

export const regionToTimezone = async (region: string) => {
  switch (true) {
    case region.includes('asia'):
      return 'Asia/Tokyo'
    case region.includes('europe'):
      return 'Europe/Amsterdam'
    default:
      return 'America/Los_Angeles'
  }
}

export const getRunUrl = async (projectId: string, appName: string) => {
  try {
    const runName = (await getNetworkConfig(projectId, appName)).cloudRunName
    console.log(runName)
    const cmd = `gcloud run services list --project=${projectId} | grep ${runName} | awk '{print $4}'`
    const res = String(execSync(cmd)).replace(/\r?\n/g, '')

    return res
  } catch (error) {
    return ''
  }
}

export const isNegExists = async (
  projectId: string,
  region: string,
  methodName: string,
) => {
  const { neg } = await getFunctionInfo(methodName)
  const shCmd = [
    'gcloud',
    'compute',
    'network-endpoint-groups',
    'describe',
    neg,
    '--region',
    region,
    '--project',
    projectId,
  ]
  try {
    const stdout = String(execSync(shCmd.join(' '), { stdio: 'ignore' }))
    if (stdout.includes('ERROR:')) throw new Error('does not exist')
    return true
  } catch (error) {
    return false
  }
}

export const defaultProductionEnvArray = [
  'NO_PEER_DEPENDENCY_CHECK=1',
  'DATABASE_URL=postgresql://postgres:${{ secrets.SKEET_GCP_DB_PASSWORD }}@${{ secrets.SKEET_GCP_DB_PRIVATE_IP }}:5432/skeet-${{ secrets.SKEET_APP_NAME }}-production?schema=public',
  'SKEET_GCP_PROJECT_ID=${{ secrets.SKEET_GCP_PROJECT_ID }}',
  'SKEET_GCP_TASK_REGION=${{ secrets.SKEET_GCP_TASK_REGION }}',
  'GOOGLE_CLOUD_PROJECT=${{ secrets.SKEET_FB_PROJECT_ID }}',
  'SKEET_API_ENDPOINT_URL=${{ secrets.SKEET_API_ENDPOINT_URL }}',
  'TZ=${{ secrets.TZ }}',
]

export const getBuidEnvArray = async (
  projectId: string,
  fbProjectId: string,
  databaseUrl: string,
  tz: string,
) => {
  return [
    'NO_PEER_DEPENDENCY_CHECK=1',
    `SKEET_GCP_PROJECT_ID=${projectId}`,
    `SKEET_FB_PROJECT_ID=${fbProjectId}`,
    `TZ=${tz}`,
    `DATABASE_URL=${databaseUrl}`,
  ]
}

export const getActionsEnvString = async (filePath: string) => {
  const stream = fs.readFileSync(filePath)
  const envArray: Array<string> = String(stream).split('\n')
  const newEnv: Array<string> = []
  for await (const envLine of envArray) {
    const keyAndValue = envLine.match(/([A-Z_]+)="?([^"]*)"?/)
    if (keyAndValue) {
      if (keyAndValue[1].match('SKEET_')) continue
      if (keyAndValue[1] === 'TZ') continue
      const envString =
        `${keyAndValue[1]}=$` + '{{ ' + `secrets.${keyAndValue[1]}` + ' }}'
      newEnv.push(envString)
    }
  }
  const returnArray = defaultProductionEnvArray.concat(newEnv)
  return returnArray.join(',')
}

export const getBuidEnvString = async () => {
  const skeetConfig = importConfig()
  const envProductionPath = skeetConfig.app.template.includes('GraphQL')
    ? PATH.GRAPHQL + '/' + FILE_NAME.ENV_PRODUCTION
    : PATH.SQL + '/' + FILE_NAME.ENV_PRODUCTION
  const stream = fs.readFileSync(envProductionPath)
  const envArray: Array<string> = String(stream).split('\n')
  const hash: { [key: string]: string } = {}
  for await (const line of envArray) {
    const value = line.split('=')
    hash[value[0]] = value[1]
  }
  const dabaseUrl = `postgresql://postgres:${hash['SKEET_GCP_DB_PASSWORD']}@${hash['SKEET_GCP_DB_PRIVATE_IP']}:5432/skeet-${hash['SKEET_APP_NAME']}-production?schema=public`
  const buildEnvArray = await getBuidEnvArray(
    hash['SKEET_GCP_PROJECT_ID'],
    hash['GOOGLE_CLOUD_PROJECT'],
    dabaseUrl,
    hash['TZ'],
  )
  const newEnv = envArray.filter((value) => {
    if (
      !value.match('SKEET_GCP_PROJECT_ID') &&
      !value.match('SKEET_GCP_DB_PASSWORD')
    ) {
      return value
    }
  })
  const returnArray = buildEnvArray.concat(newEnv)
  return returnArray.join(',')
}
