import { mkdir, readdir } from 'fs/promises'
import path from 'path'

export const getSQLs = async () => {
  const dir = path.join(process.cwd(), 'sql')
  if (!dir) {
    await mkdir(dir)
  }
  console.log(dir)
  const apps = await readdir(dir)
  return apps
}
