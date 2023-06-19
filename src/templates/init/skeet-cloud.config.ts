import fetch from 'node-fetch'

export const skeetCloudConfigGen = async (appName: string) => {
  const filePath = `${appName}/skeet-cloud.config.json`
  const homeIp = await getHomeIp()
  const body = `{
  "app": {
    "name": "${appName}",
    "projectId": "${appName}",
    "region": "europe-west4",
    "appDomain": "your-app-url.com",
    "functionsDomain": "functions.your-app-url.com"
  },
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
