import { program } from '@/index'
import { Logger, importConfig } from '@/lib'
import { fuctionsLog } from '@/lib/firebase/functionsLog'

export const logCommands = async () => {
  program
    .command('log')
    .option('-f, --function <function>', 'Function Name. e.g. root')
    .option('-aa, --AA', 'Show AA logs', false)
    .description('Deploy Skeet APP to Firebase')
    .action(async (options) => {
      const { app } = importConfig()
      if (options.function) {
        const functionName = options.function
        fuctionsLog(app.projectId, functionName)
        return
      } else if (options.AA) {
        Logger.skeetAA()
        Logger.welcomText('', 'install')
      } else {
        fuctionsLog(app.projectId)
      }
    })
}
