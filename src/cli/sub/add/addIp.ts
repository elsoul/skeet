import fetch from 'node-fetch'
import { SKEET_CONFIG_PATH } from '@/index'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import { Logger, importConfig } from '@/lib'
import { writeFileSync } from 'fs'

export const addIp = async () => {
  const homeIp = await getHomeIp()
  await addHomeIpToSkeetConfig(homeIp)
  Logger.successCheck(`Successfully added ${homeIp} to DB white list`)
}

export const getHomeIp = async () => {
  const url = 'https://api.ipify.org/?format=json'
  const response = await sendGet(url)
  const data: any = await response.json()
  const ip = data.ip.replace(/\r?\n/g, '')
  return ip
}

export const sendGet = async (url: string) => {
  try {
    const res = fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    return res
  } catch (e) {
    console.log({ e })
    throw new Error('sendGET failed')
  }
}

export const addHomeIpToSkeetConfig = async (ip: string) => {
  let skeetConfig: SkeetCloudConfig = await importConfig()
  const whiteList = skeetConfig.db.whiteList || ''
  skeetConfig.db.whiteList =
    whiteList === '' ? whiteList + `${ip}` : whiteList + `,${ip}`

  writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
}
