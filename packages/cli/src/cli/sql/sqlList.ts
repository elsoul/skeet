import { SkeetCloudConfig } from '@/types/skeetTypes'
import { importConfig, listSQL } from '@/lib'

export const sqlList = async () => {
  const skeetCloudConfig: SkeetCloudConfig = importConfig()
  await listSQL(skeetCloudConfig.app.projectId)
}
