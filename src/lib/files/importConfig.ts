import { SkeetCloudConfig } from '@/types/skeetTypes'
import { readFileSync } from 'fs'

export const importConfig = () => {
  try {
    const config = readFileSync(`./skeet-cloud.config.json`)
    const json: SkeetCloudConfig = JSON.parse(String(config))
    return json
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export const importFirebaseConfig = async () => {
  try {
    const config = readFileSync(`./firebase.json`)
    const json = JSON.parse(String(config))
    return json
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
