import { importConfig } from '@/lib'
import { deleteBackend } from './deleteBackend'
import { deleteNeg } from './deleteNeg'

export const deleteRoutings = async (methodName: string) => {
  const config = importConfig()
  await deleteBackend(config.app.projectId, methodName)
  await deleteNeg(config.app.projectId, methodName, config.app.region)
}
