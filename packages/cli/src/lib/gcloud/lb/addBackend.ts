import { getFunctionInfo, getNetworkConfig } from '@/lib'
import { execAsync } from '@skeet-framework/utils'

export const addBackend = async (
  projectId: string,
  appName: string,
  methodName: string,
  region: string,
  init = false,
) => {
  const appConf = getNetworkConfig(projectId, appName)
  const functionInfo = getFunctionInfo(methodName)
  const backendName = init
    ? appConf.defaultBackendServiceName
    : functionInfo.backendService
  const shCmd = [
    'gcloud',
    'compute',
    'backend-services',
    'add-backend',
    backendName,
    '--network-endpoint-group',
    functionInfo.neg,
    '--network-endpoint-group-region',
    region,
    '--global',
    '--project',
    projectId,
  ]
  return await execAsync(shCmd.join(' '))
}
