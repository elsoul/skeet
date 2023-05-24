import { Logger } from '@/lib/logger'
import { execSync } from 'child_process'

export const curl = async (
  projectId: string,
  region: string,
  methodName: string
) => {
  try {
    const url = `http://127.0.0.1:5001/${projectId}/${region}/${methodName}`
    const accessToken = process.env.ACCESS_TOKEN

    if (!accessToken) {
      throw new Error(
        'ACCESS_TOKEN environment variable is not set.\n Please run `skeet login`'
      )
    }

    const curlCommand = `curl --location --request POST ${url} --header "Authorization: Bearer ${accessToken}" | json_pp`
    const res = execSync(curlCommand)
    const data = res.toString()

    await Logger.normal(data)
  } catch (error) {
    throw new Error(`curl: ${error}`)
  }
}
