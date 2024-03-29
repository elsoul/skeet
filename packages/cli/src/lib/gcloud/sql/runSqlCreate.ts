import prompt from 'prompt'
import percentEncode from '@stdlib/string-percent-encode'
import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { patchSQL } from './patchSQL'
import { generateEnvBuild } from './generateEnvBuild'
import { generateEnvProduction } from './generateEnvProduction'
import { getDatabaseIp } from './getDatabaseIp'
import { createSQL } from './createSQL'
import { createSqlUser } from './createSqlUser'
import { genEnvBuild } from '@/lib/files/genEnvBuild'
import { firebaseAddSecret } from '@/lib/firebase/firebaseAddSecret'

export const runSqlCreate = async (
  projectId: string,
  sqlName: string,
  region: string,
  databaseVersion: string,
  cpu: string,
  memory: string,
) => {
  const dbPassPrompt = {
    properties: {
      userName: {
        description: 'Enter DB User Name',
      },
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
      return
    } else {
      const networkName = getNetworkConfig(projectId, sqlName).networkName
      const userName = String(result.userName)
      const password = String(result.password)
      await createSqlUser(projectId, sqlName, userName, password)
      await createSQL(
        projectId,
        sqlName,
        region,
        password,
        databaseVersion,
        cpu,
        memory,
      )
      const encodedPassword = percentEncode(password)
      const databaseIp = await getDatabaseIp(projectId, sqlName)
      await generateEnvBuild(sqlName, userName, databaseIp, encodedPassword)

      // Add Firebase Secret
      const genDir = `./sql/${sqlName}`
      const { key, value } = await genEnvBuild(
        sqlName,
        genDir,
        databaseIp,
        encodedPassword,
      )
      await firebaseAddSecret(key, value)
      await patchSQL(projectId, sqlName, '', '', networkName)
      const databasePrivateIp = await getDatabaseIp(projectId, sqlName, true)
      const productionKeyAndValue = await generateEnvProduction(
        sqlName,
        userName,
        databasePrivateIp,
        encodedPassword,
      )
      await firebaseAddSecret(
        productionKeyAndValue.key,
        productionKeyAndValue.value,
      )
    }
  })
}
