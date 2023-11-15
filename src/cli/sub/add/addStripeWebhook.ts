import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import chalk from 'chalk'
import { existsSync, writeFileSync } from 'fs'
import { insertFunction } from './addMethod'
import { stripeRouter } from '@/templates/stripe/stripeRouter'
import { payment } from '@/templates/stripe/payment'
import { subscription } from '@/templates/stripe/subscription'

export const addStripeWebhook = () => {
  try {
    let { body, filePath } = stripeRouter()
    if (existsSync(filePath)) {
      return false
    }
    writeFileSync(filePath, body)
    ;({ body, filePath } = payment())
    writeFileSync(filePath, body)
    ;({ body, filePath } = subscription())
    writeFileSync(filePath, body)

    console.log(chalk.green(`✅ stripeRouter added 🎉`))
    console.log(chalk.green(`✅ webhook/subscription added 🎉`))
    console.log(chalk.green(`✅ webhook/payment added 🎉`))
    const indexFile = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/index.ts`
    const methodName = 'stripeRouter'
    insertFunction(indexFile, methodName)
    return true
  } catch (error) {
    throw new Error(`addStripeWebhook: ${error}`)
  }
}
