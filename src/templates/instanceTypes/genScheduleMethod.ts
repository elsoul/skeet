import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'
import { toPascalCase } from './genPubSubMethod'

export const genScheduleMethod = async (
  functionsName: string,
  methodName: string
) => {
  const pascalMethodName = toPascalCase(methodName)
  const scheduleMethodName = `schedule${pascalMethodName}`
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/schedule/${scheduleMethodName}.ts`
  const body = `import { onSchedule } from 'firebase-functions/v2/scheduler'
import { scheduleDefaultOption } from '@/routings/options'

export const ${scheduleMethodName} = onSchedule(
  scheduleDefaultOption,
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
