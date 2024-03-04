import { execSyncCmd } from '@/lib/execSyncCmd'

export const createSQL = async (
  projectId: string,
  instanceName: string,
  region: string = 'europe-west4-b',
  dbPassword: string = 'postgres',
  databaseVersion: string = 'POSTGRES_15',
  cpu: string = '1',
  memory: string = '4096MB',
) => {
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
  await execSyncCmd(shCmd)
}
