import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsync } from '@skeet-framework/utils'

export const createSsl = async (
  projectId: string,
  appName: string,
  domain: string,
) => {
  const appConf = getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'compute',
    'ssl-certificates',
    'create',
    appConf.sslName,
    '--domains',
    domain,
    '--project',
    projectId,
  ]
  return await execAsync(shCmd.join(' '))
}
