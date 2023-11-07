import { execSyncCmd, importConfig } from '@/lib'
import { TaskQueue } from '@/types/skeetTypes'
import { Logger } from '@/lib/logger'
import { SKEET_CONFIG_PATH } from '@/index'
import { writeFileSync } from 'fs'

export const addTaskQueue = async (
  projectId: string,
  queueName: string,
  region: string,
  maxAttempts: number = 10,
  maxConcurrent: number = 1,
  maxRate: number = 1,
  maxInterval: string = '10s',
  minInterval: string = '1s',
  isUpdate: boolean = false,
) => {
  const method = isUpdate ? 'update' : 'create'
  const location = region.slice(0, -1) + '1'
  const taskQueue: TaskQueue = {
    queueName,
    location,
    maxAttempts,
    maxConcurrent,
    maxRate,
    maxInterval,
    minInterval,
  }
  const shCmd = [
    'gcloud',
    'tasks',
    'queues',
    method,
    taskQueue.queueName,
    '--location',
    taskQueue.location,
    '--max-attempts',
    String(taskQueue.maxAttempts),
    '--max-concurrent-dispatches',
    String(taskQueue.maxConcurrent),
    '--max-dispatches-per-second',
    String(taskQueue.maxRate),
    '--max-backoff',
    taskQueue.maxInterval,
    '--min-backoff',
    taskQueue.minInterval,
    '--project',
    projectId,
  ]
  execSyncCmd(shCmd)
  if (!isUpdate) await addTaskQueueToConf(taskQueue)
  Logger.success('Successfully Updated skeet-cloud.config.json!')
}

export const addTaskQueueToConf = async (taskQueue: TaskQueue) => {
  const skeetConfig = importConfig()
  if (skeetConfig.taskQueues) {
    skeetConfig.taskQueues.push(taskQueue)
    writeFileSync(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  }
}
