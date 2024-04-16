import { SKEET_CONFIG_PATH } from '@/index'
import { Logger } from '@/lib/logger'
import { writeFile } from 'fs/promises'
import { sendGet } from '@skeet-framework/utils'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'

export const addIp = async () => {
  const homeIp = await getHomeIp()
  await addHomeIpToSkeetConfig(homeIp)
  Logger.successCheck(`Successfully added ${homeIp} to DB white list`)
}

export const getHomeIp = async () => {
  const url = 'https://api.ipify.org/?format=json'
  const response = await sendGet(url)
  const ip = response.ip.replace(/\r?\n/g, '')
  return ip
}

export const addHomeIpToSkeetConfig = async (ip: string) => {
  const skeetConfig = await readOrCreateConfig()
  const whiteList = skeetConfig.SQL[0].whiteList || ''
  skeetConfig.SQL[0].whiteList =
    whiteList === '' ? whiteList + `${ip}` : whiteList + `,${ip}`

  await writeFile(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
}
