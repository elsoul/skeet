import { execAsyncCmd, getFunctionInfo } from '@/lib'
import { convertToKebabCase } from '@/utils/string'

export const deleteNeg = async (
  projectId: string,
  methodName: string,
  region: string,
) => {
  try {
    const kebab = convertToKebabCase(methodName)
    const functionInfo = getFunctionInfo(kebab)
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
    execAsyncCmd(shCmd)
  } catch (error) {
    throw new Error(`deleteNeg: ${error}`)
  }
}
