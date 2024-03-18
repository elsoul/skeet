import {
  execAsyncCmd,
  getNetworkConfig,
  importConfig,
  setGcloudProject,
} from '@/lib'

export const syncSql = async () => {
  const skeetConfig = await importConfig()
  await setGcloudProject(skeetConfig.app.projectId)
  const networkConfig = getNetworkConfig(
    skeetConfig.app.projectId,
    skeetConfig.app.name,
  )
  const shCmd = [
    'gcloud',
    'sql',
    'instances',
    'patch',
    networkConfig.instanceName,
    '--storage-size',
    String(skeetConfig.db.storageSize),
    '--cpu',
    String(skeetConfig.db.cpu),
    '--memory',
    skeetConfig.db.memory,
    '--project',
    skeetConfig.app.projectId,
  ]
  execAsyncCmd(shCmd)
}
