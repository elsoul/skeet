import { Logger } from '@/lib'
import { convertToKebabCase } from '@/utils/string'
import { execSync } from 'child_process'

export const curl = async <T>(
  projectId: string,
  region: string,
  methodName: string,
  params: T = false as T,
  options: {
    isProduction?: boolean
    functionsDomain?: string
    functionsName?: string
    isRaw?: boolean
  } = {
    isProduction: false,
    functionsDomain: '',
    functionsName: '',
    isRaw: false,
  }
) => {
  try {
    const kebab = convertToKebabCase(methodName)
    const url = options.isProduction
      ? `https://${options.functionsDomain}/${options.functionsName}/${kebab}`
      : `http://127.0.0.1:5001/${projectId}/${region}/${methodName}`
    const accessToken = process.env.ACCESS_TOKEN
    let curlCmd = `curl --location --request POST ${url} --header "Authorization: Bearer ${accessToken}"`

    if (params) {
      curlCmd = curlCmd + ` --header 'Content-Type: application/json'`
      curlCmd = curlCmd + ` --data '${params}'`
    }

    if (options.isRaw) {
      curlCmd = curlCmd + ` --raw`
    } else {
      curlCmd = curlCmd + ` | json_pp`
    }

    if (!accessToken) {
      throw new Error(
        'ACCESS_TOKEN environment variable is not set.\n Please run `skeet login`'
      )
    }

    const res = execSync(curlCmd)
    const data = res.toString()

    Logger.normal(data)
  } catch (error) {
    throw new Error(`curl: ${error}`)
  }
}
