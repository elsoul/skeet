import { SKEET_CONFIG_PATH } from '@/lib'
import { mkdir, writeFile } from 'fs/promises'
import { updateDefaultIndex } from './updateDefaultIndex'
import { addScriptToPackageJson } from '@/lib/files/addScriptToPackageJson'
import { updatePackageJsonName } from '@/lib/files/updatePackageJsonName'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { dlSQLTemplate } from '@/lib/dlSQLTemplate'
import { execAsync } from '@skeet-framework/utils'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'
import { runPsql } from '../docker'
import {
  DOCKER_DB_NAME,
  DOCKER_DB_PASS,
  DOCKER_DB_USER,
  defaultSQLconfig,
} from '@/config/config'

export const cloneSQL = async (sqlName: string) => {
  const config = await readOrCreateConfig()
  const sqlRoot = './sql/' + sqlName
  if (await checkFileDirExists(sqlRoot)) {
    console.log('SQL already exists')
    return
  }
  await mkdir(sqlRoot, { recursive: true })
  await dlSQLTemplate(sqlName)
  const dbDevURL = `DATABASE_URL=postgresql://${DOCKER_DB_USER}:${DOCKER_DB_PASS}@127.0.0.1:5432/${DOCKER_DB_NAME}?schema=public`
  await execAsync(`echo ${dbDevURL} >> ${sqlRoot}/.env`)
  await updateDefaultIndex(sqlName)
  await updatePackageJsonName(sqlName, sqlRoot + '/package.json')
  await addScriptToPackageJson(
    './package.json',
    `skeet:${sqlName}`,
    `pnpm -F ${sqlName} dev`,
  )
  await runPsql()
  await execAsync(`pnpm install && pnpm -F ${sqlName} build`)
  const sqlConfig = defaultSQLconfig(sqlName)
  config.SQL.push(sqlConfig)
  await writeFile(SKEET_CONFIG_PATH, JSON.stringify(config, null, 2))
}
