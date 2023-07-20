import { importConfig, program } from '@/index'
import { curl } from './curl'

export const curlCommands = async () => {
  program
    .command('curl')
    .description('Skeet Curl Command - Call Cloud Functions Endpoint for Dev')
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
      const config = await importConfig()
      if (options.production) {
        if (!options.functions) throw new Error('Need to define functionsName')

        const functionsDomain = config.app.functionsDomain
        const curlOptions = {
          isProduction: options.production,
          functionsDomain,
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
