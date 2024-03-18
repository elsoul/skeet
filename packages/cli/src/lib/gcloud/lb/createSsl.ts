import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { execAsyncCmd } from '@/lib/execAsyncCmd'

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
  execAsyncCmd(shCmd)
}
