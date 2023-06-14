import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'

export const genHttpMethodParams = async (
  functionsName: string,
  methodName: string
) => {
  const firstChar = methodName.charAt(0).toUpperCase()
  const capitalizedMethodName = firstChar + methodName.slice(1)
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/types/http/${methodName}Params.ts`
  const body = `export type ${capitalizedMethodName}Params = {
  name?: string
}
  `
  return {
    filePath,
    body,
  }
}
