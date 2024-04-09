import { execAsyncCmd } from '@/lib/execAsyncCmd'
import { spawnSync } from 'node:child_process'

export const createFixIp = async (
  projectId: string,
  region: string,
  ipName: string,
  isGlobal: boolean = false,
) => {
  const ipRegion = isGlobal ? '--global' : `--region=${region}`
  const shCmd = [
    'gcloud',
    'compute',
    'addresses',
    'create',
    ipName,
    ipRegion,
    '--project',
    projectId,
  ]
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
}

export const getIp = async (projectId: string, ipName: string) => {
  try {
    const shCmd = [
      'gcloud',
      'compute',
      'addresses',
      'describe',
      ipName,
      '--format="get(address)"',
      '--global',
      '--project',
      projectId,
    ]
    const { stdout } = await execAsyncCmd(shCmd)
    const ip = stdout.replace(/\r?\n/g, '')
    return ip
  } catch (error) {
    throw new Error(`getIp: ${JSON.stringify(String(error))}`)
  }
}
