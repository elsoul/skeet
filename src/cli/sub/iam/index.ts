import { importConfig, program } from '@/index'
import { setupIam, createServiceAccountKey, addJsonEnv } from '@/cli'

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
    .description('Download IAM Key for Google Cloud Platform')
    .action(async () => {
      const config = await importConfig()
      await createServiceAccountKey(config.app.projectId, config.app.name)
    })
  iam
    .command('sync')
    .description('Sync Service Account Key as GitHub Secret')
    .action(async () => {
      await addJsonEnv()
    })
}
