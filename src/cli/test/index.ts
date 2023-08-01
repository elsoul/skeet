import { program } from '@/index'
import { skeetTest } from './test'
import { importConfig } from '@/lib'

export const testCommands = async () => {
  program
    .command('test')
    .description('Skeet Jest Test Command')
    .action(async () => {
      //await skeetTest()
      const skeetConfig = await importConfig()
      const a = skeetConfig.app.template.includes('GraphQL')
      console.log(a)
    })
}
