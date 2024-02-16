import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'
import { existsSync, mkdirSync } from 'fs'

export const payment = () => {
  const fileDir = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}/src/lib/stripe/webhook`
  if (!existsSync(fileDir)) {
    mkdirSync(fileDir, { recursive: true })
  }
  const filePath = `${fileDir}/payment.ts`
  const body = `import Stripe from 'stripe'

export const payment = async (
  db: FirebaseFirestore.Firestore,
  eventObject: Stripe.Checkout.Session,
) => {
  console.log('payment event handler')
  console.log({
    customerId: String(eventObject.customer),
    name: eventObject.customer_details?.name,
    email: eventObject.customer_details?.email,
  })
  return true
}`
  return {
    filePath,
    body,
  }
}
