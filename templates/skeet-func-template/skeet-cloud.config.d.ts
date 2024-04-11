declare module 'skeet-cloud.config.json' {
  const value: SkeetCloudConfig
}
export type SkeetCloudStatusType =
  | 'NOT_CREATED'
  | 'PROJECT_CREATED'
  | 'FUNCTIONS_CREATED'
  | 'GITHUB_ACTIONS_CREATED'
  | 'VPN_CREATED'
  | 'LOAD_BALANCER_CREATED'

export type LangType = 'en' | 'ja'

export type SkeetCloudConfig = {
  lang: LangType
  app: AppConfig
  cloudRun: CloudRunConfig[]
  SQL: SQLConfig[]
  taskQueue: TaskQueue[]
  cloudArmor: CloudArmor[]
  routing: Routing[]
  secretKey: string[]
}

export type AppConfig = {
  name: string
  projectId: string
  projectId: string
  region: string
  nameServerDomain: string
  loadBalancerDomain: string
  appDomains: AppDomains[]
  hasLoadBalancer: boolean
  cloudStatus: SkeetCloudStatusType
}

export type AppDomains = {
  name: string
  domain: string
}

export type CloudRunConfig = {
  name: string
  url: string
  localPort: number
  cpu: number
  memory: string
  maxConcurrency: number
  minInstances: number
  maxInstances: number
}

export enum DatabaseVersion {
  POSTGRES_15 = 'POSTGRES_15',
  MYSQL_8_0 = 'MYSQL_8_0',
}

export type DATABASE_TYPE =
  (typeof DatabaseVersion)[keyof typeof DatabaseVersion]

export type SQL_STATUS = 'RUNNING' | 'NOT_CREATED' | 'PAUSED'

export type SQLConfig = {
  instanceName: string
  databaseVersion: DATABASE_TYPE
  cpu: number
  memory: string
  storageSize: number
  whiteList?: string
  status: SQL_STATUS
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
