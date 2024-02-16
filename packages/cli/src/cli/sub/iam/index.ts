import { program } from '@/index'
import { importConfig } from '@/lib'
import { createServiceAccountKey } from '@/lib/gcloud'
import { setupIam } from '@/lib/setup'
import { addJsonEnv } from '@/lib/git'
import { setupIamAi } from '@/lib/setup/setupIamAi'

export const iamSubCommands = async () => {
  const iam = program
    .command('iam')
    .description('Skeet IAM Comannd to setup Google Cloud Platform')
  iam
    .command('ai')
    .description('Setup AI for Google Cloud Platform')
    .action(async () => {
      await setupIamAi()
    })
  iam
    .command('init')
    .description('Setup IAM for Google Cloud Platform')
    .action(async () => {
      await setupIam()
    })
  iam
    .command('pull')
    .description('Download IAM Key for Google Cloud Platform')
    .action(async () => {
      const config = importConfig()
      await createServiceAccountKey(config.app.projectId, config.app.name)
    })
  iam
    .command('sync')
    .description('Sync Service Account Key as GitHub Secret')
    .action(async () => {
      await addJsonEnv()
    })
}
