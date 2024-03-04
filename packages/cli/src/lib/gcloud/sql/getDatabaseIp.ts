import { execSyncCmd } from '@/lib/execSyncCmd'

export const getDatabaseIp = async (
  projectId: string,
  instanceName: string,
  privateIp: boolean = false,
) => {
  try {
    const ipCol = privateIp === true ? '$6' : '$5'
    const cmd = [
      'gcloud',
      'sql',
      'instances',
      'list',
      `--project=${projectId}`,
      '|',
      'grep',
      instanceName,
      '|',
      'awk',
      `{print ${ipCol}}`,
    ]
    const { stdout } = await execSyncCmd(cmd)
    const databaseIp = String(stdout).replace(/\r?\n/g, '')
    return databaseIp
  } catch (error) {
    return `error: ${error}`
  }
}
