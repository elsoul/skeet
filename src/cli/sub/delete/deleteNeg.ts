import { execSyncCmd, getFunctionInfo } from '@/lib'
import { convertToKebabCase } from '@/utils/string'

export const deleteNeg = async (
  projectId: string,
  methodName: string,
  region: string
) => {
  try {
    const kebab = convertToKebabCase(methodName)
    const functionInfo = await getFunctionInfo(kebab)
    const shCmd = [
      'gcloud',
      'compute',
      'network-endpoint-groups',
      'delete',
      functionInfo.neg,
      '--region',
      region,
      '--project',
      projectId,
      '--quiet',
    ]
    await execSyncCmd(shCmd)
  } catch (error) {
    throw new Error(`deleteNeg: ${error}`)
  }
}
