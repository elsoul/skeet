import { CallableOptions } from 'firebase-functions/v2/https'
import skeetOptions from '../../../skeetOptions.json'

const appName = skeetOptions.name
const project = skeetOptions.projectId
const region = skeetOptions.region
const serviceAccount = `${appName}@${project}.iam.gserviceaccount.com`
const vpcConnector = `${appName}-con`

export const onCallOption: CallableOptions = {
  region,
  cpu: 1,
  memory: '1GiB',
  maxInstances: 100,
  minInstances: 0,
  concurrency: 1,
  timeoutSeconds: 540,
  cors: [/skeet\.dev$/, 'epics.dev'],
  labels: {
    skeet: 'onCall',
  },
}

export const onCallPrivateOption: CallableOptions = {
  region,
  cpu: 1,
  memory: '2GiB',
  maxInstances: 100,
  minInstances: 0,
  concurrency: 80,
  serviceAccount,
  ingressSettings: 'ALLOW_INTERNAL_AND_GCLB',
  vpcConnector,
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY',
  cors: [/skeet\.dev$/, 'epics.dev'],
  timeoutSeconds: 540,
  labels: {
    skeet: 'onCall',
  },
}
