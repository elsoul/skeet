import { readFile } from 'fs/promises'
import { CONTAINER_REGIONS } from '@/config/region'
import { execAsyncCmd } from '../execAsyncCmd'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { findSQLConfigByName } from './findSQLConfigByName'

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
export const BACKEND_SQL_REPO_URL = 'https://github.com/elsoul/skeet-sql'
export const BACKEND_FUNCTIONS_REPO_URL =
  'https://github.com/elsoul/skeet-functions-only'
export const SOLANA_REPO_URL =
  'https://github.com/elsoul/skeet-solana-mobile-stack'
export const FRONT_APP_PATH = './src'
export const WEB_APP_PATH = './webapp'
export const KEYFILE_PATH = './keyfile.json'

export const getFunctionInfo = (functionName: string) => {
  const functionInfo = {
    name: `skeet-functions-${functionName}`,
    neg: `skeet-${functionName}-neg`,
    backendService: `skeet-${functionName}-bs`,
    armor: `skeet-${functionName}-armor`,
  }
  return functionInfo
}

export const getFunctionConfig = async (functionName: string) => {
  try {
    const tsconfig = await readFile('./tsconfig.json', 'utf-8')
    const prretierrc = await readFile('.prettierrc', 'utf-8')
    const result = {
      package: await readConfigFile(functionName, 'package.json'),
      tsconfig,
      prretierrc,
    }
    return result
  } catch (error) {
    throw new Error(`getFunctionConfig: ${error}`)
  }
}

const readConfigFile = async (functionName: string, file: string) => {
  try {
    const path = `${FUNCTIONS_PATH}/${functionName}/${file}`
    return await readFile(path, 'utf-8')
  } catch (error) {
    return ''
  }
}

export const getNetworkConfig = (projectId: string, appName: string) => {
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

export const getRegistryRegion = (region: string) => {
  switch (region) {
    case region.match('asia')?.input:
      return 'asia'
    case region.match('eu')?.input:
      return 'eu'
    default:
      return 'us'
  }
}

export const getContainerImageUrl = (
  projectId: string,
  imageName: string,
  region: string,
) => {
  const cRegion: CONTAINER_REGIONS = getContainerRegion(region)
  const registryRegion = getRegistryRegion(region)
  const artifactRegistry = `${registryRegion}-docker.pkg.dev/${projectId}/${cRegion}/${imageName}`
  return artifactRegistry
}

export const getContainerImageName = async (appName: string) => {
  const imageName = 'skeet-' + appName
  return imageName
}

export const regionToTimezone = (region: string) => {
  switch (true) {
    case region.includes('asia'):
      return 'Asia/Tokyo'
    case region.includes('europe'):
      return 'Europe/Amsterdam'
    default:
      return 'America/Los_Angeles'
  }
}

export const isNegExists = async (
  projectId: string,
  region: string,
  methodName: string,
) => {
  const { neg } = getFunctionInfo(methodName)
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
    const { stdout, stderr } = await execAsyncCmd(shCmd)
    if (stderr.includes('ERROR:') || stdout === '') return false
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
  const stream = await readFile(filePath)
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

export const getBuidEnvString = async (sqlName: string) => {
  const envProductionPath = `sql/${sqlName}/.env.build`
  const stream = await readFile(envProductionPath)
  const envArray: Array<string> = String(stream).split('\n')
  const hash: { [key: string]: string } = {}
  for await (const line of envArray) {
    const value = line.split('=')
    hash[value[0]] = value[1]
  }
  return envArray.join(',')
}
