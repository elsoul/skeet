import { FUNCTIONS_PATH } from '@/lib'

export const genHttpMethod = async (
  functionsName: string,
  methodName: string
) => {
  const firstChar = methodName.charAt(0).toUpperCase()
  const httpParams = firstChar + methodName.slice(1) + 'Params'
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/http/${methodName}.ts`
  const body = `import { onRequest } from 'firebase-functions/v2/https'
import { publicHttpOption } from '@/routings/options'
import { TypedRequestBody } from '@/types/http'
import { ${httpParams} } from '@/types/http/${methodName}Params'

export const ${methodName} = onRequest(publicHttpOption, async (req: TypedRequestBody<${httpParams}>, res) => {
  try {
    res.json({
      status: 'success'
    })
  } catch (error) {
    res.status(500).json({ status: 'error', message: String(error) })
  }
})
  `
  return {
    filePath,
    body,
  }
}
