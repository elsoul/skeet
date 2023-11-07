import { sleep } from '@/utils/time'
import { importConfig, setGcloudProject } from '@/lib'
import { addTaskQueue } from '../add/addTaskQueue'

export const syncTaskQueue = async () => {
  const skeetConfig = importConfig()
  await setGcloudProject(skeetConfig.app.projectId)
  if (skeetConfig.taskQueues) {
    for await (const taskQueue of skeetConfig.taskQueues) {
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
