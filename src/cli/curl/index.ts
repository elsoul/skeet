import { program } from '@/index'
import { curl } from './curl'
import { importConfig } from '@/lib'
export const curlCommands = async () => {
  program
    .command('curl')
    .description('Skeet Curl Command - Call Firebase Functions Endpoint')
    .argument(
      '<methodName>',
      'Method Name - e.g. skeet curl createUserChatRoom'
    )
    .option(
      '-d,--data [data]',
      'JSON Request Body - e.g. \'{ "model": "gpt4", "maxTokens": 420 }\''
    )
    .option('-r, --raw', 'Show chunk data', false)
    .option('-p, --production', 'For Production', false)
    .option(
      '-f,--functions [functions]',
      'For Production Functions Name',
      false
    )
    .action(async (methodName: string, options) => {
      const config = importConfig()
      if (options.production) {
        if (!options.functions) throw new Error('Need to define functionsName')

        const lbDomain = config.app.lbDomain
        const curlOptions = {
          isProduction: options.production,
          lbDomain,
          functionsName: options.functions,
          isRaw: options.raw,
        }
        await curl<Record<any, any>>(
          config.app.projectId,
          config.app.region,
          methodName,
          options.data,
          curlOptions
        )
      } else {
        const curlOptions = {
          isRaw: options.raw,
        }
        await curl<Record<any, any>>(
          config.app.projectId,
          config.app.region,
          methodName,
          options.data,
          curlOptions
        )
      }
    })
}
