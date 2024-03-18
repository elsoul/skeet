import { execAsyncCmd } from '@/lib/execAsyncCmd'

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
  await execAsyncCmd(shCmd)
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
    console.log(ip)
    return ip
  } catch (error) {
    throw new Error(`getIp: ${JSON.stringify(String(error))}`)
  }
}
