import { SKEET_CONFIG_PATH } from '@/lib'
import { spawnSync } from 'child_process'
import { mkdir, writeFile } from 'fs/promises'
import { updateDefaultIndex } from './updateDefaultIndex'
import { addScriptToPackageJson } from '@/lib/files/addScriptToPackageJson'
import { updatePackageJsonName } from '@/lib/files/updatePackageJsonName'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'
import { dlSQLTemplate } from '@/lib/dlSQLTemplate'
import { execAsync } from '@skeet-framework/utils'
import { CloudRunConfig, SQLConfig } from '@/config/skeetCloud'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'

export const cloneSQL = async (sqlName: string) => {
  const config = await readOrCreateConfig()
  const sqlRoot = './sql/' + sqlName
  if (await checkFileDirExists(sqlRoot)) {
    console.log('SQL already exists')
    return
  }
  await mkdir(sqlRoot, { recursive: true })
  await dlSQLTemplate(sqlName)
  const dbDevURL = `DATABASE_URL=postgresql://skeeter:rabbit@127.0.0.1:5432/skeet-${sqlName}-dev?schema=public`
  await execAsync(`echo ${dbDevURL} >> ${sqlRoot}/.env`)
  const sqlCmd = sqlName.replace('-db', '')
  await updateDefaultIndex(sqlName)
  await updatePackageJsonName(sqlName, sqlRoot + '/package.json')
  await addScriptToPackageJson(
    './package.json',
    `skeet:${sqlCmd}`,
    `pnpm -F ${sqlName} dev`,
  )
  await execAsync(`pnpm install && pnpm -F ${sqlName} build`)
  const defaultSQLconfig: SQLConfig = {
    username: 'Buidler',
    instanceName: sqlName,
    databaseVersion: 'POSTGRES_15',
    cpu: 1,
    memory: '4GiB',
    storageSize: 10,
    whiteList: '',
    status: 'NOT_CREATED',
  }
  config.SQL.push(defaultSQLconfig)
  await writeFile(SKEET_CONFIG_PATH, JSON.stringify(config, null, 2))
}
