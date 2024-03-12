export enum SkeetTemplate {
  NextJsFirestore = 'Next.js (React) - Firestore',
  ExpoFirestore = 'Expo (React Native) - Firestore',
  SolanaFirestore = 'Solana Mobile Stack (Expo) + Web (Next.js) - Firestore',
  BackendOnly = 'Backend Only - Firestore',
}

export enum SkeetTemplateBackend {
  GraphQL = 'Backend Only - GraphQL',
  Firestore = 'Backend Only - Firestore',
}

export type SkeetOptions = {
  name: string
  projectId: string
  region: string
  fbProjectId: string
  appDomain: string
  nsDomain: string
  lbDomain: string
}

export type SkeetCloudConfig = {
  app: AppConfig
  ai: AiConfig
  cloudRun: CloudRunConfig
  cloudRuns: CloudRunConfig[]
  SQLs: DbConfig[]
  db: DbConfig
  taskQueues: TaskQueue[]
  cloudArmor: CloudArmor[]
  routings: Routing[]
}

export type AppConfig = {
  name: string
  projectId: string
  fbProjectId: string
  template: string
  region: string
  appDomain: string
  nsDomain: string
  lbDomain: string
  hasLoadBalancer: boolean
}

export type CloudRunConfig = {
  name: string
  url: string
  cpu: number
  memory: string
  maxConcurrency: number
  minInstances: number
  maxInstances: number
}

export type DbConfig = {
  instanceName: string
  databaseVersion: string
  cpu: string
  memory: string
  storageSize: number
  whiteList?: string
  isCreated: boolean
}

export type TaskQueue = {
  queueName: string
  location: string
  maxAttempts: number
  maxInterval: string
  minInterval: string
  maxConcurrent: number
  maxRate: number
}

export type Rules = {
  priority: string
  description: string
  options: { [key: string]: string }
}
export type CloudArmor = {
  securityPolicyName: string
  rules: Rules[]
}

export type Routing = {
  methodName: string
  securityPolicyName: string
  path?: string
}

export type TranslateJson = {
  langFrom: string
  langsTo: string[]
  paths: string[]
}

export type AiConfig = {
  lang: string
  ais: AI[]
}

export type AI = {
  name: string
  availableModels: string[]
}

export enum SkeetInstanceType {
  HTTP = 'http',
  AUTH = 'auth',
  FIRESTORE = 'firestore',
  PUBSUB = 'pubsub',
  SCHEDULE = 'schedule',
  ONCALL = 'onCall',
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

export type SkeetAiLog = {
  role: string
  content: string
  mode: SkeetAiMode
  model: string
  createdAt: string
}

export enum SkeetRole {
  AI = 'ai',
  USER = 'user',
}
