import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { execAsyncCmd, getNetworkConfig, setGcloudProject } from '@/lib'
import { selectDb } from '../db/selectDb'

export const syncSql = async () => {
  const skeetConfig = await readOrCreateConfig()
  const dbDirs = await selectDb()
  await setGcloudProject(skeetConfig.app.projectId)
  for (const instanceName of dbDirs) {
    const sql = await findSQL(instanceName)
    if (sql) {
      const shCmd = [
        'gcloud',
        'sql',
        'instances',
        'patch',
        instanceName,
        '--storage-size',
        String(sql.storageSize),
        '--cpu',
        String(sql.cpu),
        '--memory',
        sql.memory,
        '--project',
        skeetConfig.app.projectId,
      ]
      await execAsyncCmd(shCmd)
    }
  }
}

const findSQL = async (instanceName: string) => {
  const { SQL } = await readOrCreateConfig()
  const method = SQL.find((routing) => routing.instanceName === instanceName)
  if (!method) return null
  return method
}
