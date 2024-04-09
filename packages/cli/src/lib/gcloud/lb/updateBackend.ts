import { getFunctionInfo } from '@/lib'
import { spawnSync } from 'node:child_process'

export const updateBackend = async (
  projectId: string,
  securityPolicyName: string,
  methodName: string,
) => {
  const functionInfo = getFunctionInfo(methodName)
  const shCmd = [
    'gcloud',
    'compute',
    'backend-services',
    'update',
    functionInfo.backendService,
    '--security-policy',
    securityPolicyName,
    '--global',
    '--project',
    projectId,
  ]
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
}
