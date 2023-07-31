import { program } from '@/index'
import { Logger, importConfig } from '@/lib'
import { inspect } from 'util'
import { sendGraphqlRequest } from './post'
import { QueryType } from '@skeet-framework/utils'

export const postCommands = async () => {
  program
    .command('post')
    .description('Skeet Post Command - Call Skeet GraphQL Endpoint')
    .argument('<queryType>', 'Query Type - e.g. mutation or query')
    .option('-q,--queryName [queryName]', 'Query Name - e.g. createUser')
    .option(
      '-b,--body [body]',
      'JSON Request Body - e.g. \'{ "model": "gpt-3.5-turbo", "maxTokens": 420 }\''
    )
    .option(
      '-r, --responseParams [responseParams]',
      "Response Params e.g. 'id,model'"
    )
    .option('-p, --production', 'For Production', false)
    .action(async (queryType: QueryType, options) => {
      let responseParams: string[] = []
      console.log(options)
      if (options.responseParams) {
        responseParams = options.responseParams.split(',')
      } else {
        responseParams = ['id']
      }
      const body = !options.body
        ? { model: 'gpt-3.5-turbo' }
        : JSON.parse(options.body)
      let response: any
      if (options.production) {
        const { cloudRun } = await importConfig()
        response = await sendGraphqlRequest(
          queryType,
          options.queryName,
          body,
          responseParams,
          cloudRun.url
        )
      } else {
        response = await sendGraphqlRequest(
          queryType,
          options.queryName,
          body,
          responseParams
        )
      }
      Logger.normal(inspect(response, false, null, true))
    })
}
