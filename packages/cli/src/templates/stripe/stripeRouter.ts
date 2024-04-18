import { DEFAULT_FUNCTION_NAME } from '@/index'
import { FUNCTIONS_PATH } from '@/lib'

export const stripeRouter = () => {
  const filePath = `${FUNCTIONS_PATH}/${DEFAULT_FUNCTION_NAME}-func/src/routings/http/stripeRouter.ts`
  const body = `import { onRequest } from 'firebase-functions/v2/https'
import { publicHttpOption } from '@/routings/options'
import Stripe from 'stripe'
import { db } from '@/index'
import { defineSecret } from 'firebase-functions/params'
import { config } from '@/lib/config'
import { subscription } from '@/lib/stripe/webhook/subscription'
import { payment } from '@/lib/stripe/webhook/payment'

// Please \`skeet add secret\` to add your secret
// e.g. skeet add secret STRIPE_SECRET_KEY
const STRIPE_SECRET_KEY = defineSecret('STRIPE_SECRET_KEY')
const STRIPE_SECRET_KEY_TEST = defineSecret('STRIPE_SECRET_KEY_TEST')
const STRIPE_WEBHOOK_SECRET_KEY = defineSecret('STRIPE_WEBHOOK_SECRET_KEY')
const STRIPE_WEBHOOK_SECRET_KEY_TEST = defineSecret(
  'STRIPE_WEBHOOK_SECRET_KEY_TEST',
)


export const stripeRouter = onRequest(
  {
    ...publicHttpOption,
    secrets: [
      STRIPE_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET_KEY,
      STRIPE_WEBHOOK_SECRET_KEY_TEST,
      STRIPE_SECRET_KEY_TEST,
    ],
  },
  async (req, res) => {
    // Initialize Stripe
    const secretKey = getConfigValue(
      STRIPE_SECRET_KEY.value(),
      STRIPE_SECRET_KEY_TEST.value(),
    )
    const stripe = new Stripe(secretKey, {
      apiVersion: '2023-10-16',
    })

    // Get the webhook secret
    const secret = getConfigValue(
      STRIPE_WEBHOOK_SECRET_KEY.value(),
      STRIPE_WEBHOOK_SECRET_KEY_TEST.value(),
    )

    // Verify webhook signature and extract the event.
    const payload =
      config.NODE_ENV === 'production' ? req.rawBody : JSON.stringify(req.body)

    try {
      //let event = req.body as Stripe.Event
      const event = await getVerifiedStripeEvent(req, stripe, secret, payload)
      switch (event.type) {
        case 'checkout.session.completed': {
          const eventObject = event.data.object
          if (eventObject.mode === 'subscription') {
            await subscription(db, eventObject)
          }
          if (eventObject.mode === 'payment') {
            await payment(db, eventObject)
          }
          break
        }
        default:
          break
      }
      res.json({
        status: 'success',
      })
    } catch (error) {
      res.status(500).json({ status: 'error', message: String(error) })
    }
  },
)

function getConfigValue<T>(productionValue: T, testValue: T): T {
  return config.NODE_ENV === 'production' ? productionValue : testValue
}

async function getVerifiedStripeEvent(
  req: any,
  stripe: Stripe,
  secret: string,
  payload: string | Buffer,
): Promise<Stripe.Event> {
  // Get the signature sent by Stripe
  let sig = getStripeSignature(req, stripe, payload, secret)

  try {
    return stripe.webhooks.constructEvent(payload, sig, secret)
  } catch (err) {
    throw new Error(\`Webhook signature verification failed: \${err}\`)
  }
}

function getStripeSignature(
  req: any,
  stripe: Stripe,
  payload: string | Buffer,
  secret: string,
): string {
  if (config.NODE_ENV === 'production') {
    return req.headers['stripe-signature'] || ''
  } else {
    console.log('⚠️  Using test secret key')
    const payloadAsString =
      typeof payload === 'string' ? payload : payload.toString()
    return stripe.webhooks.generateTestHeaderString({
      payload: payloadAsString,
      secret,
    })
  }
}`
  return {
    filePath,
    body,
  }
}
