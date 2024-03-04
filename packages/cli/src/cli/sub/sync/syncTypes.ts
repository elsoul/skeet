import {
  Logger,
  getTypeFiles,
  copyFileWithOverwrite,
  importConfig,
} from '@/lib'
import { mkdir, rm } from 'fs/promises'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'

export const syncTypes = async () => {
  const types = await getTypeFiles()
  Logger.sync(`⏳ Syncing ${types.map((type) => type.functionName)}...`)
  const { app } = await importConfig()
  for await (const type of types) {
    const frontTypeDir = `src/types/http/${type.functionName}`
    const webAppDir = `webapp/src/types/http/${type.functionName}`
    if (await checkFileDirExists(frontTypeDir)) {
      await rm(frontTypeDir, { recursive: true })
    }

    if (await checkFileDirExists('webapp')) {
      await rm(webAppDir, { recursive: true })
    }

    for await (const typePath of type.modelsPath) {
      const typeFilePath = `functions/${type.functionName}/src/types/http/${typePath}`
      const frontTypePath = `${frontTypeDir}/${typePath}`
      const webAppTypePath = `${webAppDir}/${typePath}`
      if (!(await checkFileDirExists(frontTypeDir))) {
        await mkdir(frontTypeDir, { recursive: true })
      }

      await copyFileWithOverwrite(typeFilePath, frontTypePath)
      if (await checkFileDirExists('webapp')) {
        if (!(await checkFileDirExists(webAppDir))) {
          await mkdir(webAppDir, { recursive: true })
        }
        await copyFileWithOverwrite(typeFilePath, webAppTypePath)
      }
    }
  }
}
