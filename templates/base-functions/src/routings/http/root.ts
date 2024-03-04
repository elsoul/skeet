import { onRequest } from 'firebase-functions/v2/https'
import { publicHttpOption } from '@/routings/options'
import { TypedRequestBody } from '@common/types/http'
import { RootParams } from '@common/types/http/rootParams'

export const root = onRequest(
  publicHttpOption,
  async (req: TypedRequestBody<RootParams>, res) => {
    try {
      // Define your logic here
      res.json({ status: 'success' })
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  },
)
