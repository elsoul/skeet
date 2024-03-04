import { Timestamp, FieldValue } from '@skeet-framework/firestore'

// CollectionId: User
// DocumentId: auto
// Path: User
export const UserCN = 'User'
export const genUserPath = () => `${UserCN}`
export type User = {
  id?: string
  uid: string
  username: string
  email: string
  iconUrl: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
}