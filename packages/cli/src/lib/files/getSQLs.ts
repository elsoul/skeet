import { mkdirSync, readdirSync } from 'fs'
import path from 'path'

export const getSQLs = () => {
  const dir = path.join(process.cwd(), 'sql')
  if (!dir) {
    mkdirSync(dir)
  }
  console.log(dir)
  const apps = readdirSync(dir)
  return apps
}
