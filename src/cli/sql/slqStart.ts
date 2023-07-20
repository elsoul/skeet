import { SkeetCloudConfig } from '@/types/skeetTypes'
import { patchSQL } from '@/cli'
import { importConfig } from '@/index'

export const sqlStart = async () => {
  const skeetCloudConfig: SkeetCloudConfig = await importConfig()
  await patchSQL(
    skeetCloudConfig.api.projectId,
    skeetCloudConfig.api.appName,
    'always'
  )
}
