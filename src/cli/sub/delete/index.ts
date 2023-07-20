import { program } from '@/index'
import { deleteRoutings } from './deleteRoutings'

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
}
