import { program } from '@/index'
import { createServiceAccountKey } from '@/lib/gcloud'
import { setupIam } from '@/lib/setup'
import { addJsonEnv } from '@/lib/git'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'

export const iamSubCommands = async () => {
  const iam = program
    .command('iam')
    .description('Skeet IAM Comannd to setup Google Cloud Platform')

  iam
    .command('init')
    .description('Setup IAM for Google Cloud Platform')
    .action(async () => {
      await setupIam()
    })
  iam
    .command('pull')
    .description(
      'Download IAM Key for Google Cloud Platform path: ./keypair.json',
    )
    .action(async () => {
      const config = await readOrCreateConfig()
      await createServiceAccountKey(config.app.projectId, config.app.name)
    })
  iam
    .command('sync')
    .description(
      'Sync Service Account Key as GitHub Secret path: ./keypair.json',
    )
    .action(async () => {
      await addJsonEnv()
    })
}
