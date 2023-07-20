import { Logger, getTypeFiles, copyFileWithOverwrite } from '@/lib'
import { existsSync, mkdirSync } from 'fs'

export const syncTypes = async () => {
  const types = await getTypeFiles()
  Logger.sync(`⏳ Syncing ${types.map((type) => type.functionName)}...`)
  for await (const type of types) {
    for await (const typePath of type.modelsPath) {
      const typeFilePath = `functions/${type.functionName}/src/types/http/${typePath}`
      const frontTypeDir = `src/types/http/${type.functionName}`
      if (!existsSync(frontTypeDir)) {
        mkdirSync(frontTypeDir, { recursive: true })
      }
      const frontTypePath = `${frontTypeDir}/${typePath}`
      Logger.sync(`📃 Copying ${typeFilePath} to ${frontTypePath}`)
      await copyFileWithOverwrite(typeFilePath, frontTypePath)
    }
  }
}
