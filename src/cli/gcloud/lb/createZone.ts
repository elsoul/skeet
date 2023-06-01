import { execSyncCmd } from '@/lib/execSyncCmd'
import { getNetworkConfig } from '@/lib/getSkeetConfig'
import { execSync } from 'child_process'

export const createZone = async (
  projectId: string,
  appName: string,
  domain: string
) => {
  const appConf = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'dns',
    'managed-zones',
    'create',
    appConf.zoneName,
    '--dns-name',
    domain,
    '--visibility',
    'public',
    '--description',
    `Skeet ${domain} config`,
    '--project',
    projectId,
  ]
  await execSyncCmd(shCmd)
}

export const getZone = async (projectId: string, appName: string) => {
  try {
    const appConf = await getNetworkConfig(projectId, appName)
    const shCmd = [
      'gcloud',
      'dns',
      'managed-zones',
      'describe',
      appConf.zoneName,
      '--project',
      projectId,
    ]
    const res = String(execSync(shCmd.join(' ')))
    const regex = /ns-cloud-d\d\.googledomains\.com\./
    const lines = res.split('\n')
    const zoneLines: string[] = []

    for (const line of lines) {
      const match = line.match(regex)
      if (match) {
        zoneLines.push(match[0])
      }
    }

    return zoneLines
  } catch (error) {
    throw new Error(`getZone: ${error}`)
  }
}
