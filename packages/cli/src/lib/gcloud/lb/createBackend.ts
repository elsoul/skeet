import { execAsyncCmd, getFunctionInfo } from '@/lib'
import { spawnSync } from 'node:child_process'

export const createBackend = async (projectId: string, methodName: string) => {
  const functionInfo = getFunctionInfo(methodName)
  const shCmd = [
    'gcloud',
    'compute',
    'backend-services',
    'create',
    functionInfo.backendService,
    '--load-balancing-scheme',
    'EXTERNAL_MANAGED',
    '--global',
    '--project',
    projectId,
  ]
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
}
