import { SkeetTemplate } from '@/types/skeetTypes'
import fetch from 'node-fetch'

export const skeetCloudConfigGen = async (
  appName: string,
  template: string
) => {
  const filePath = `${appName}/skeet-cloud.config.json`
  const homeIp = await getHomeIp()
  const taskQueues =
    template === SkeetTemplate.NextJsGraphQL
      ? [
          {
            queueName: 'createUser',
            location: 'asia-northeast1',
            maxAttempts: 3,
            maxConcurrent: 1,
            maxRate: 1,
            maxInterval: '10s',
            minInterval: '1s',
          },
          {
            queueName: 'createChatRoomMessage',
            location: 'asia-northeast1',
            maxAttempts: 3,
            maxConcurrent: 1,
            maxRate: 1,
            maxInterval: '10s',
            minInterval: '1s',
          },
        ]
      : []
  const cloudRunBody =
    template === SkeetTemplate.NextJsGraphQL
      ? {
          name: `skeet-${appName}-graphql`,
          url: '',
          cpu: 1,
          maxConcurrency: 80,
          maxInstances: 100,
          minInstances: 0,
          memory: '4Gi',
        }
      : {}
  const dbBody =
    template === SkeetTemplate.NextJsGraphQL
      ? {
          databaseVersion: 'POSTGRES_15',
          cpu: 1,
          memory: '3840MiB',
          storageSize: 10,
          whiteList: '',
        }
      : {}
  const body = `{
  "app": {
    "name": "${appName}",
    "projectId": "${appName}",
    "fbProjectId": "${appName}",
    "template": "${template}",
    "region": "europe-west6",
    "appDomain": "app.your-app-url.com",
    "nsDomain": "your-nameserver.com",
    "lbDomain": "loadbalancer.your-app-url.com",
    "hasLoadBalancer": false
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
          "description": "Deny All IP addresses",
          "options": {
            "action": "deny-403"
          }
        }
      ]
    }
  ]
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
    let response = await sendGet(url)
    let data = await response.json()
    const ipifyResponse = data as IpifyResponse
    const ip = ipifyResponse.ip.replace(/\r?\n/g, '')
    return ip
  } catch (error) {
    return ''
  }
}

const sendGet = async (url: string) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    return res
  } catch (e) {
    console.log({ e })
    throw new Error('sendGET failed')
  }
}
