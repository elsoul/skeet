import { BACKEND_SQL_REPO_URL, SKEET_CONFIG_PATH, importConfig } from '@/lib'
import { spawnSync } from 'child_process'
import { mkdir, writeFile } from 'fs/promises'
import { updateDefaultIndex } from './updateDefaultIndex'
import { addScriptToPackageJson } from '@/lib/files/addScriptToPackageJson'
import { pnpmBuild } from '@/lib/pnpmBuild'
import { updatePackageJsonName } from '@/lib/files/updatePackageJsonName'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'

export const cloneSQL = async (sqlName: string) => {
  const config = await importConfig()
  const sqlRoot = './sql/' + sqlName
  if (await checkFileDirExists(sqlRoot)) {
    console.log('SQL already exists')
    return
  }
  await mkdir(sqlRoot, { recursive: true })
  const gitCloneCmd = ['git', 'clone', BACKEND_SQL_REPO_URL, sqlRoot]
  spawnSync(gitCloneCmd[0], gitCloneCmd.slice(1), { stdio: 'inherit' })
  const dbDevURL = `DATABASE_URL=postgresql://skeeter:rabbit@127.0.0.1:5432/skeet-${sqlName}-dev?schema=public`
  spawnSync(`echo ${dbDevURL} >> ${sqlRoot}/.env`, {
    shell: true,
    stdio: 'inherit',
  })
  spawnSync(`rm -rf ${sqlRoot}/.git`, { shell: true, stdio: 'inherit' })
  pnpmBuild(sqlRoot)
  const instanceName = 'sql-' + sqlName
  const sqlCmd = instanceName.replace('-db', '')
  await updateDefaultIndex(instanceName)
  await updatePackageJsonName(sqlName, sqlRoot + '/package.json')
  await addScriptToPackageJson(
    './package.json',
    `skeet:${sqlCmd}`,
    `pnpm -F ${sqlName} dev`,
  )
  const defaultSQLconfig = {
    instanceName,
    databaseVersion: 'POSTGRES_15',
    cpu: '1GiB',
    memory: '4GiB',
    storageSize: 10,
    whiteList: '',
    isCreated: false,
  }
  config.SQLs.push(defaultSQLconfig)
  await writeFile(SKEET_CONFIG_PATH, JSON.stringify(config, null, 2))
}
