import { program } from '@/index'
import { deleteRoutings } from './deleteRoutings'
import { getSecretKeys } from '@/lib/files/getSecretKeys'
import {
  firebaseRemoveSecret,
  removeSecretFromConfig,
} from '@/lib/firebase/firebaseRemoveSecret'
import { firebasePruneSecret } from '@/lib/firebase/firebasePruneSecret'
import { SKEET_CONFIG_CLOUD_PATH } from '@/config/config'
import chalk from 'chalk'

export const deleteSubCommands = async () => {
  const d = program
    .command('delete')
    .alias('d')
    .description('Skeet Delete Command')
  d.command('routings')
    .argument('<methodName>', 'Functions Name - e.g. skeet')
    .description('Delete Routings')
    .action(async (methodName: string) => {
      await deleteRoutings(methodName)
    })

  d.command('secret')
    .option('-k, --key <key>', '')
    .option('-p, --prune')
    .description('Delete Fireabse Secret Secret Value')
    .action(async (options: { key: string; prune: boolean }) => {
      if (options.prune) {
        console.log(chalk.blue('✔︎ Pruning secrets'))
        await firebasePruneSecret()
        return
      }
      const key = options.key
      if (options.key == null) {
        const keys = await getSecretKeys()
        for (const key of keys) {
          console.log(`Deleting secret - ${key}`)
          const result = await firebaseRemoveSecret(key)
          if (result?.stdout) console.log(result.stdout)
        }
        return
      }
      console.log(`Deleting secret - ${key}`)
      const result = await firebaseRemoveSecret(key)
      if (result?.stdout) console.log(result.stdout)
    })
}
