import { SkeetCloudConfig } from '@/types/skeetTypes'
import { patchSQL, importConfig } from '@/lib'

export const sqlStart = async () => {
  const skeetCloudConfig: SkeetCloudConfig = importConfig()
  await patchSQL(
    skeetCloudConfig.app.projectId,
    skeetCloudConfig.app.name,
    'always'
  )
}
