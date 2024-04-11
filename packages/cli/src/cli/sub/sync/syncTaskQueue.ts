import { sleep } from '@/utils/time'
import { setGcloudProject } from '@/lib'
import { addTaskQueue } from '../add/addTaskQueue'
import { readOrCreateConfig } from '@/config/readOrCreateConfig'

export const syncTaskQueue = async () => {
  const skeetConfig = await readOrCreateConfig()
  await setGcloudProject(skeetConfig.app.projectId)
  if (skeetConfig.taskQueue) {
    for await (const taskQueue of skeetConfig.taskQueue) {
      const isUpdate = true
      await addTaskQueue(
        skeetConfig.app.projectId,
        taskQueue.queueName,
        taskQueue.location,
        taskQueue.maxAttempts,
        taskQueue.maxConcurrent,
        taskQueue.maxRate,
        taskQueue.maxInterval,
        taskQueue.minInterval,
        isUpdate,
      )
      await sleep(200)
    }
  }
}
