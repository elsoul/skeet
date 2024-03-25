export const defaultSkeetCloudConfig: SkeetCloudConfig = {
  app: {
    name: '',
    projectId: '',
    fbProjectId: '',
    region: '',
    nameServerDomain: '',
    loadBalancerDomain: '',
    appDomains: [],
    hasLoadBalancer: false,
  },
  cloudRun: [],
  SQL: [],
  taskQueue: [],
  cloudArmor: [],
  routing: [],
  lang: 'en',
}

export type SkeetCloudConfig = {
  app: AppConfig
  cloudRun: CloudRunConfig[]
  SQL: SQLConfig[]
  taskQueue: TaskQueue[]
  cloudArmor: CloudArmor[]
  routing: Routing[]
  lang: 'en' | 'ja'
}

export type AppConfig = {
  name: string
  projectId: string
  fbProjectId: string
  region: string
  nameServerDomain: string
  loadBalancerDomain: string
  appDomains: AppDomains[]
  hasLoadBalancer: boolean
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

export const DatabaseVersion = {
  POSTGRES_15: 'POSTGRES_15',
  MYSQL_8_0: 'MYSQL_8_0',
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
