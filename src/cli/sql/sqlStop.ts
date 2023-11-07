import { SkeetCloudConfig } from '@/types/skeetTypes'
import { importConfig, patchSQL } from '@/lib'

export const sqlStop = async () => {
  const skeetCloudConfig: SkeetCloudConfig = importConfig()
  await patchSQL(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
    'NEVER',
  )
}
