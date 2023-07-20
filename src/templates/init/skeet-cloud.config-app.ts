import { Logger } from '@/lib/logger'
import { existsSync } from 'fs'

export const skeetCloudConfigAppGen = async () => {
  const appName = process.cwd().split('/')[0]
  const filePath = './skeet-cloud.config.json'
  if (existsSync(filePath)) {
    Logger.error(`File skeet-cloud.config.json already exists.`)
    process.exit(0)
  }
  const body = `{
  "app": {
    "name": "${appName}",
    "projectId": "${appName}",
    "region": "europe-west4",
    "appDomain": "your-app-url.com",
    "functionsDomain": "functions.your-app-url.com"
  },
  "functions": [],
  "cloudArmor": []
}  
`
  return {
    filePath,
    body,
  }
}
