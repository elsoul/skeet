import { FUNCTIONS_PATH } from '@/lib'
import { toCamelCase } from '@/utils/string'

export const genScheduleMethod = async (
  functionsName: string,
  methodName: string
) => {
  const camelMethodName = toCamelCase(methodName)
  const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/routings/schedule/${camelMethodName}.ts`
  const body = `import { onSchedule } from 'firebase-functions/v2/scheduler'
import { scheduleDefaultOption } from '@/routings/options'

export const ${camelMethodName} = onSchedule(
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
