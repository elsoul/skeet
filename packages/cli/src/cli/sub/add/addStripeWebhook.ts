import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import chalk from 'chalk'
import { writeFile } from 'fs/promises'
import { insertFunction } from './addMethod'
import { stripeRouter } from '@/templates/stripe/stripeRouter'
import { payment } from '@/templates/stripe/payment'
import { subscription } from '@/templates/stripe/subscription'
import { checkFileDirExists } from '@/lib/files/checkFileDirExists'

export const addStripeWebhook = async () => {
  try {
    let { body, filePath } = stripeRouter()
    if (await checkFileDirExists(filePath)) {
      return false
    }
    await writeFile(filePath, body)
    ;({ body, filePath } = await payment())
    await writeFile(filePath, body)
    ;({ body, filePath } = await subscription())
    await writeFile(filePath, body)

    console.log(chalk.green(`✅ stripeRouter added 🎉`))
    console.log(chalk.green(`✅ webhook/subscription added 🎉`))
    console.log(chalk.green(`✅ webhook/payment added 🎉`))
    const indexFile = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}-func/src/index.ts`
    const methodName = 'stripeRouter'
    await insertFunction(indexFile, methodName)
    return true
  } catch (error) {
    throw new Error(`addStripeWebhook: ${error}`)
  }
}
