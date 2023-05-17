import { copyFileWithOverwrite } from '@/lib/copyFiles'
import { getTypeFiles } from '@/lib/getTypeFiles'
import { Logger } from '@/lib/logger'
import fs from 'fs'

export const syncTypes = async () => {
  const types = await getTypeFiles()
  for await (const type of types) {
    Logger.sync(`⏳ Syncing ${type.functionName}...`)
    for await (const typePath of type.modelsPath) {
      const typeFilePath = `functions/${type.functionName}/src/types/http/${typePath}`
      const frontTypeDir = `src/types/http/${type.functionName}`
      if (!fs.existsSync(frontTypeDir)) {
        fs.mkdirSync(frontTypeDir, { recursive: true })
      }
      const frontTypePath = `${frontTypeDir}/${typePath}`
      Logger.sync(`📃 Copying ${typeFilePath} to ${frontTypePath}`)
      await copyFileWithOverwrite(typeFilePath, frontTypePath)
    }
  }
}
