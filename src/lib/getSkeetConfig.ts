import { createHash } from 'crypto'
import { execSync } from 'child_process'

export const TYPE_PATH = './types'
export const FUNCTIONS_PATH = './functions'
export const FIREBASE_CONFIG_PATH = './firebase.json'
export const SKEET_CONFIG_PATH = './skeet-cloud.config.json'
export const ROUTE_PACKAGE_JSON_PATH = './package.json'
export const FUNCTIONS_REPO_URL = 'https://github.com/elsoul/skeet-functions'
export const APP_REPO_URL = 'https://github.com/elsoul/skeet-app'
export const NEXT_REPO_URL = 'https://github.com/elsoul/skeet-next'
export const FRONT_APP_PATH = './src'
export const KEYFILE_PATH = './keyfile.json'

export const genSecret = async (name: string) => {
  try {
    return createHash('sha256').update(name).digest('hex')
  } catch (error) {
    throw new Error(`genSecret: ${error}`)
  }
}

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

export const getNetworkConfig = async (projectId: string, appName: string) => {
  const skeetHd = 'skeet-' + appName
  return {
    projectId,
    appName,
    cloudRunName: `${skeetHd}-api`,
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
    serviceAccountName: `${projectId}@${projectId}.iam.gserviceaccount.com`,
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

export const getContainerRegion = async (region: string) => {
  switch (region) {
    case region.match('asia')?.input:
      return 'asia.gcr.io'
    case region.match('eu')?.input:
      return 'eu.gcr.io'
    default:
      return 'gcr.io'
  }
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
  methodName: string
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
