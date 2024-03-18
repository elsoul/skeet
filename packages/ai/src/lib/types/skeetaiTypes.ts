import { InputOutput } from '../genPrompt'

export type Example = {
  context: string
  examples: InputOutput[]
}

export enum NamingEnum {
  MIGRATION = 'migration',
  FUNCTION = 'function',
  MODEL = 'model',
}

export enum SkeetAiMode {
  Function = 'function',
  Firestore = 'firestore',
  Method = 'method',
  Prisma = 'prisma',
  Skeet = 'skeet',
  Translate = 'translate',
  Typedoc = 'typedoc',
  YesOrNo = 'yesOrNo',
}

export enum InstanceType {
  AUTH = 'auth',
  FIRESTORE = 'firestore',
  PUBSUB = 'pubsub',
  SCHEDULE = 'schedule',
  HTTP = 'http',
}
