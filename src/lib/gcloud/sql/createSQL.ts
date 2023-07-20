import prompt from 'prompt'
import percentEncode from '@stdlib/string-percent-encode'
import { Logger } from '@/lib'
import { execSync, spawnSync } from 'child_process'
import {
  getNetworkConfig,
  getContainerRegion,
  genSecret,
  regionToTimezone,
} from '@/lib'
import { patchSQL } from './patchSQL'
import { API_ENV_BUILD_PATH, API_ENV_PRODUCTION_PATH } from '@/index'
import { writeFileSync } from 'fs'

export const runSqlCreate = async (
  projectId: string,
  appName: string,
  region: string,
  databaseVersion: string,
  cpu: string,
  memory: string
) => {
  const dbPassPrompt = {
    properties: {
      password: {
        description: 'Enter DB Root Password',
        hidden: true,
        replace: '*',
      },
      passwordConfirm: {
        description: 'Confirm Password',
        hidden: true,
        replace: '*',
      },
    },
  }
  prompt.start()
  prompt.get(dbPassPrompt, async (err, result) => {
    if (result.password !== result.passwordConfirm) {
      console.log('password does not match!')
    } else {
      const networkName = (await getNetworkConfig(projectId, appName))
        .networkName
      const password = String(result.password)
      await createSQL(
        projectId,
        appName,
        region,
        password,
        databaseVersion,
        cpu,
        memory
      )
      const encodedPassword = percentEncode(password)
      const databaseIp = await getDatabaseIp(projectId, appName)
      await generateEnvBuild(appName, databaseIp, encodedPassword)

      await patchSQL(projectId, appName, '', '', networkName)
      const databasePrivateIp = await getDatabaseIp(projectId, appName, true)
      await generateEnvProduction(
        projectId,
        appName,
        region,
        databasePrivateIp,
        encodedPassword
      )
    }
  })
}

export const generateEnvBuild = async (
  appName: string,
  databaseIp: string,
  encodedPassword: string
) => {
  const filePath = API_ENV_BUILD_PATH
  const databaseUrl = `DATABASE_URL=postgresql://postgres:${encodedPassword}@${databaseIp}:5432/skeet-${appName}-production?schema=public\n`
  const nodeSetting = 'NO_PEER_DEPENDENCY_CHECK=1\nSKEET_ENV=production'
  const envFile = databaseUrl + nodeSetting
  writeFileSync(filePath, envFile, { flag: 'w' })
  Logger.success(`successfully exported! - ${filePath}`)
}

export const generateEnvProduction = async (
  projectId: string,
  appName: string,
  region: string,
  databaseIp: string,
  encodedPassword: string
) => {
  const filePath = API_ENV_PRODUCTION_PATH
  const cRegion = await getContainerRegion(region)
  const secretKey = await genSecret(appName)
  const secretKeyPW = await genSecret(appName)
  const secretKeyCrypto = await genSecret(appName)
  const timeZone = await regionToTimezone(region)
  const envProduction = [
    `SKEET_APP_NAME=${appName}\n`,
    `SKEET_GCP_PROJECT_ID=${projectId}\n`,
    `GOOGLE_CLOUD_PROJECT=${projectId}\n`,
    `SKEET_GCP_REGION=${region}\n`,
    `SKEET_GCP_TASK_REGION=${region}\n`,
    `SKEET_GCP_DB_PASSWORD=${encodedPassword}\n`,
    `SKEET_CONTAINER_REGION=${cRegion}\n`,
    `SKEET_GCP_DB_PRIVATE_IP=${databaseIp}\n`,
    `SKEET_JWT_SALT=${secretKey}\n`,
    `SKEET_BASE_URL=https://${appName}.com\n`,
    `SKEET_PW_SALT=${secretKeyPW}\n`,
    `SKEET_CRYPTO_SALT=${secretKeyCrypto}\n`,
    `TZ=${timeZone}`,
  ]
  envProduction.forEach((keyValue) => {
    writeFileSync(filePath, keyValue, { flag: 'a' })
  })
  Logger.success(`successfully exported! - ${filePath}`)
}

export const getDatabaseIp = async (
  projectId: string,
  appName: string,
  privateIp: boolean = false
) => {
  try {
    const ipCol = privateIp === true ? '$6' : '$5'
    const cmd = `gcloud sql instances list --project=${projectId} | grep ${appName} | awk '{print ${ipCol}}'`
    const res = execSync(cmd)
    const databaseIp = String(res).replace(/\r?\n/g, '')
    return databaseIp
  } catch (error) {
    return `error: ${error}`
  }
}

export const createSQL = async (
  projectId: string,
  appName: string,
  region: string = 'europe-west4-b',
  dbPassword: string = 'postgres',
  databaseVersion: string = 'POSTGRES_15',
  cpu: string = '1',
  memory: string = '4096MB'
) => {
  const instanceName = (await getNetworkConfig(projectId, appName)).instanceName
  const shCmd = [
    'gcloud',
    'sql',
    'instances',
    'create',
    instanceName,
    '--database-version',
    databaseVersion,
    '--cpu',
    cpu,
    '--memory',
    memory,
    '--region',
    region,
    '--project',
    projectId,
    '--root-password',
    dbPassword,
    '--database-flags',
    'cloudsql.iam_authentication=on',
  ]
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit' })
}
