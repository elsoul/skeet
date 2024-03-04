import { Request } from 'firebase-functions/v2/https'

export interface TypedRequestBody<T> extends Request {
  body: T
}
