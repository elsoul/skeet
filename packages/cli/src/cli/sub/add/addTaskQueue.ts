import { TaskQueue } from '@/types/skeetTypes'
import { Logger } from '@/lib/logger'
import { SKEET_CONFIG_PATH } from '@/index'
import { writeFile } from 'fs/promises'
import { spawnSync } from 'node:child_process'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'

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

  // Cloud Task does not support europe-west4, so we need to convert it to europe-west6
  const location = region.includes('europe-west4')
    ? region.slice(0, -1) + '6'
    : region
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
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
  if (!isUpdate) await addTaskQueueToConf(taskQueue)
  Logger.success('Successfully Updated skeet-cloud.config.json!')
}

export const addTaskQueueToConf = async (taskQueue: TaskQueue) => {
  const skeetConfig = await readOrCreateConfig()
  if (skeetConfig.taskQueue) {
    skeetConfig.taskQueue.push(taskQueue)
    await writeFile(SKEET_CONFIG_PATH, JSON.stringify(skeetConfig, null, 2))
  }
}
