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
  const { app } = await importConfig()
  for await (const type of types) {
    const frontTypeDir = `src/types/http/${type.functionName}`
    if (existsSync(frontTypeDir)) {
      rmSync(frontTypeDir, { recursive: true })
    }
    for await (const typePath of type.modelsPath) {
      const typeFilePath = `functions/${type.functionName}/src/types/http/${typePath}`
      const frontTypePath = `${frontTypeDir}/${typePath}`
      if (!existsSync(frontTypeDir)) {
        mkdirSync(frontTypeDir, { recursive: true })
      }

      await copyFileWithOverwrite(typeFilePath, frontTypePath)
    }
    if (app.template.includes('GraphQL')) {
      writePrismaSchemaToFunctions(type.functionName)
    }
  }
}
