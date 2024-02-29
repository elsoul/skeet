export const schedule = `import { onSchedule } from 'firebase-functions/v2/scheduler'
import { scheduleDefaultOption } from '@/routings/options'

export const <functionName> = onSchedule(
  scheduleDefaultOption,
  async (event) => {
    try {
      <yourScript>
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  }
)`
