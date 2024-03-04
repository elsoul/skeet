import { SKEET_CONFIG_PATH } from '@/index'
import { SkeetCloudConfig } from '@/types/skeetTypes'
import { Logger } from '@/lib/logger'
import { importConfig } from '@/lib/files/importConfig'
import { writeFile } from 'fs/promises'
import { sendGet } from '@skeet-framework/utils'

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

export const addHomeIpToSkeetConfig = async (ip: string) => {
  const skeetConfig: SkeetCloudConfig = await importConfig()
  const whiteList = skeetConfig.db.whiteList || ''
  skeetConfig.db.whiteList =
    whiteList === '' ? whiteList + `${ip}` : whiteList + `,${ip}`

  await writeFile(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
}
