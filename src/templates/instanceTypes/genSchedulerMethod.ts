import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'

export const genSchedulerMethod = async (
  functionsName: string,
  methodName: string
) => {
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/scheduler/${methodName}.ts`
  const body = `import { onSchedule } from 'firebase-functions/v2/scheduler'
import { schedulerDefaultOption } from '@/routings/options'

const TOPIC_NAME = '${methodName}'

export const ${methodName} = onSchedule(
  schedulerDefaultOption,
  async (event) => {
    try {
      console.log({ status: 'success', topic: TOPIC_NAME, event })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  }
)`
  return {
    filePath,
    body,
  }
}
