import prompt from 'prompt'
import percentEncode from '@stdlib/string-percent-encode'
import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { patchSQL } from './patchSQL'
import { generateEnvBuild } from './generateEnvBuild'
import { generateEnvProduction } from './generateEnvProduction'
import { getDatabaseIp } from './getDatabaseIp'
import { createSQL } from './createSQL'

export const runSqlCreate = async (
  projectId: string,
  appName: string,
  region: string,
  databaseVersion: string,
  cpu: string,
  memory: string,
) => {
  const dbPassPrompt = {
    properties: {
      password: {
        description: 'Enter DB Root Password',
        hidden: true,
        replace: '*',
      },
      passwordConfirm: {
        description: 'Confirm Password',
        hidden: true,
        replace: '*',
      },
    },
  }
  prompt.start()
  prompt.get(dbPassPrompt, async (err, result) => {
    if (result.password !== result.passwordConfirm) {
      console.log('password does not match!')
    } else {
      const networkName = getNetworkConfig(projectId, appName).networkName
      const password = String(result.password)
      await createSQL(
        projectId,
        appName,
        region,
        password,
        databaseVersion,
        cpu,
        memory,
      )
      const encodedPassword = percentEncode(password)
      const databaseIp = await getDatabaseIp(projectId, appName)
      await generateEnvBuild(appName, databaseIp, encodedPassword)
      const { instanceName } = getNetworkConfig(projectId, appName)
      await patchSQL(projectId, instanceName, '', '', networkName)
      const databasePrivateIp = await getDatabaseIp(projectId, appName, true)
      await generateEnvProduction(
        projectId,
        appName,
        region,
        databasePrivateIp,
        encodedPassword,
      )
    }
  })
}
