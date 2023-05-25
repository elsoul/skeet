import { Logger } from '@/lib/logger'
import { convertToKebabCase } from '@/utils/string'
import { execSync } from 'child_process'

export const curl = async <T>(
  projectId: string,
  region: string,
  methodName: string,
  params: T = false as T,
  isProduction = false,
  functionsDomain = '',
  functionsName = ''
) => {
  try {
    const kebab = convertToKebabCase(methodName)
    const url = isProduction
      ? `https://${functionsDomain}/${functionsName}/${kebab}`
      : `http://127.0.0.1:5001/${projectId}/${region}/${methodName}`
    const accessToken = process.env.ACCESS_TOKEN
    const curlCmd = params
      ? `curl --location --request POST ${url} --data '${params}' --header 'Content-Type: application/json' --header "Authorization: Bearer ${accessToken}" | json_pp`
      : `curl --location --request POST ${url} --header "Authorization: Bearer ${accessToken}" | json_pp`

    if (!accessToken) {
      throw new Error(
        'ACCESS_TOKEN environment variable is not set.\n Please run `skeet login`'
      )
    }

    console.log(curlCmd)
    const res = execSync(curlCmd)
    const data = res.toString()

    Logger.normal(data)
  } catch (error) {
    throw new Error(`curl: ${error}`)
  }
}
