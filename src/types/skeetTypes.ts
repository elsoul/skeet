export enum SkeetTemplate {
  NextJsGraphQL = 'Next.js (React) - GraphQL',
  NextJsFirestore = 'Next.js (React) - Firestore',
  ExpoFirestore = 'Expo (React Native) - Firestore',
  SolanaFirestore = 'Solana Mobile Stack (Expo) + Web (Next.js) - Firestore',
  // SolanaValidator = 'Solana Validator Monitoring Tools',
}

export type SkeetCloudConfig = {
  app: AppConfig
  cloudRun: CloudRunConfig
  db: DbConfig
  taskQueues: TaskQueue[]
  cloudArmor: CloudArmor[]
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
  functionsDomain: string
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
  databaseVersion: string
  cpu: number
  memory: string
  storageSize: number
  whiteList?: string
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
