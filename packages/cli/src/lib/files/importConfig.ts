import { SkeetCloudConfig } from '@/types/skeetTypes'
import { readFile } from 'fs/promises'

export const importConfig = async () => {
  try {
    const config = await readFile(`./skeet-cloud.config.json`)
    const json: SkeetCloudConfig = JSON.parse(String(config))
    return json
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export const importFirebaseConfig = async () => {
  try {
    const config = await readFile(`./firebase.json`, 'utf8')
    const json = JSON.parse(config)
    return json
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
