import { SQLConfig } from './skeetCloud'

export const SKEET_CONFIG_CLOUD_PATH = './skeet-cloud.config.json'

export enum SKEET_CONFIG {
  NODE_VERSION = '20.15.1',
}

export type TemplateType =
  | 'base-template'
  | 'base-functions'
  | 'base-sql'
  | 'skeet-func-template'

export const GCP_IP_RANGE = '10.124.0.0/28'

export const DOCKER_DB_NAME = 'skeet-sql-db'
export const DOCKER_DB_USER = 'skeeter'
export const DOCKER_DB_PASS = 'rabbit'

export const defaultSQLconfig = (sqlName: string): SQLConfig => {
  return {
    username: 'buidler',
    instanceName: sqlName,
    databaseVersion: 'POSTGRES_15',
    cpu: 1,
    memory: '4GiB',
    storageSize: 10,
    whiteList: '',
    status: 'NOT_CREATED',
  }
}
