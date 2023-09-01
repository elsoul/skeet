import {
  Logger,
  getTypeFiles,
  copyFileWithOverwrite,
  importConfig,
} from '@/lib'
import { existsSync, mkdirSync, rm, rmSync, rmdirSync } from 'fs'
import { writePrismaSchemaToFunctions } from './prismaSchemaToTypeScriptType'

export const syncTypes = async () => {
  const types = await getTypeFiles()
  Logger.sync(`⏳ Syncing ${types.map((type) => type.functionName)}...`)
  const { app } = importConfig()
  for await (const type of types) {
    const frontTypeDir = `src/types/http/${type.functionName}`
    const webAppDir = `webapp/src/types/http/${type.functionName}`
    if (existsSync(frontTypeDir)) {
      rmSync(frontTypeDir, { recursive: true })
    }
    const isWebAppExist = isWebAppDir()
    if (isWebAppExist) {
      rmSync(webAppDir, { recursive: true })
    }

    for await (const typePath of type.modelsPath) {
      const typeFilePath = `functions/${type.functionName}/src/types/http/${typePath}`
      const frontTypePath = `${frontTypeDir}/${typePath}`
      const webAppTypePath = `${webAppDir}/${typePath}`
      if (!existsSync(frontTypeDir)) {
        mkdirSync(frontTypeDir, { recursive: true })
      }

      await copyFileWithOverwrite(typeFilePath, frontTypePath)
      if (isWebAppExist) {
        if (!existsSync(webAppDir)) {
          mkdirSync(webAppDir, { recursive: true })
        }
        await copyFileWithOverwrite(typeFilePath, webAppTypePath)
      }
    }
    if (app.template.includes('GraphQL')) {
      writePrismaSchemaToFunctions(type.functionName)
    }
  }
}

const isWebAppDir = () => {
  return existsSync('webapp')
}
