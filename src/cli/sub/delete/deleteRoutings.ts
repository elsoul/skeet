import { importConfig } from '@/lib/importConfig'
import { deleteBackend } from './deleteBackend'
import { deleteNeg } from './deleteNeg'

export const deleteRoutings = async (methodName: string) => {
  const config = await importConfig()
  await deleteBackend(config.app.projectId, methodName)
  await deleteNeg(config.app.projectId, methodName, config.app.region)
}
