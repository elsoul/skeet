import { FUNCTIONS_PATH } from '@/lib'
import { toPascalCase } from '@skeet-framework/utils'

export const genHttpMethod = (functionsName: string, methodName: string) => {
  const pascalMethodName = toPascalCase(methodName)
  const httpParams = pascalMethodName + 'Params'
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/http/${methodName}.ts`
  const body = `import { onRequest } from 'firebase-functions/v2/https'
import { publicHttpOption } from '@/routings/options'
import { TypedRequestBody } from '@common/types/http'
import { ${httpParams} } from '@common/types/http/${methodName}Params'

export const ${methodName} = onRequest(publicHttpOption, async (req: TypedRequestBody<${httpParams}>, res) => {
  try {
    res.json({
      status: 'success'
    })
  } catch (error) {
    res.status(500).json({ status: 'error', message: String(error) })
  }
})`
  return {
    filePath,
    body,
  }
}
