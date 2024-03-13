import { onRequest } from 'firebase-functions/v2/https'
import { publicHttpOption } from '@/routings/options'
import { TypedRequestBody } from '@common/types/http'
import { RootParams } from '@common/types/http/rootParams'
import { sendDiscord } from '@skeet-framework/utils'
import { createTask } from '@skeet-framework/cloud-task'

export const root = onRequest(
  publicHttpOption,
  async (req: TypedRequestBody<RootParams>, res) => {
    try {
      const project = 'skeet-framework'
      const location = 'europe-west1'
      const queue = 'testQueue'
      const endpoint = ''
      const body = { hello: 'world' }
      //const task = await createTask()
      res.json({ status: 'success' })
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  },
)
