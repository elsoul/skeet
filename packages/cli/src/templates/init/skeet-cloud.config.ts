import { sendGet } from '@skeet-framework/utils'

export const skeetCloudConfigGen = async (
  appName: string,
  template: string,
) => {
  const filePath = `${appName}/skeet-cloud.config.json`
  const homeIp = await getHomeIp()
  const taskQueues = [] as any[]
  const cloudRunBody = {}
  const dbBody = {}
  const body = `{
  "app": {
    "name": "${appName}",
    "projectId": "${appName}",
    "projectId": "${appName}",
    "template": "${template}",
    "region": "europe-west6",
    "appDomain": "app.your-app-url.com",
    "nsDomain": "your-nameserver.com",
    "lbDomain": "loadbalancer.your-app-url.com",
    "hasLoadBalancer": false
  },
  "ai": {
    "lang": "en",
    "ais": [
      {
        "name": "VertexAI",
        "availableModels": ["chat-bison@001"]
      }
    ]
  },
  "cloudRun": ${JSON.stringify(cloudRunBody, null, 2)},
  "db": ${JSON.stringify(dbBody, null, 2)},
  "taskQueues": ${JSON.stringify(taskQueues, null, 2)},
  "cloudArmor": [
    {
      "securityPolicyName": "skeet-${appName}-armor",
      "rules": [
        {
          "priority": "10",
          "description": "Allow Your Home IP addresses",
          "options": {
            "src-ip-ranges": "${homeIp}",
            "action": "allow"
          }
        },
        {
          "priority": "300",
          "description": "Defense from NodeJS attack",
          "options": {
            "action": "deny-403",
            "expression": "evaluatePreconfiguredExpr('nodejs-v33-stable')"
          }
        },
        {
          "priority": "2147483647",
          "description": "Allow/Deny All IP addresses. default: allow",
          "options": {
            "action": "allow"
          }
        }
      ]
    }
  ],
  "routings": []
}  
`
  return {
    filePath,
    body,
  }
}

type IpifyResponse = {
  ip: string
}

export const getHomeIp = async () => {
  try {
    const url = 'https://api.ipify.org/?format=json'
    const response = await sendGet(url)
    const data = await response.json()
    const ipifyResponse = data as IpifyResponse
    const ip = ipifyResponse.ip.replace(/\r?\n/g, '')
    return ip
  } catch (error) {
    return ''
  }
}
