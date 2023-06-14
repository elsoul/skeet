import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'
import { toPascalCase } from './genPubSubMethod'

export const genSchedulerMethod = async (
  functionsName: string,
  methodName: string
) => {
  const pascalMethodName = toPascalCase(methodName)
  const schedulerMethodName = `schedule${pascalMethodName}`
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/scheduler/${schedulerMethodName}.ts`
  const body = `import { onSchedule } from 'firebase-functions/v2/scheduler'
import { schedulerDefaultOption } from '@/routings/options'

export const ${schedulerMethodName} = onSchedule(
  schedulerDefaultOption,
  async (event) => {
    try {
      console.log({ status: 'success' })
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
