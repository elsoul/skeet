import { addRole, createServiceAccount, enablePermission } from '../iam'

export const checkBillingAccount = async (
  projectId: string,
  appName: string
) => {
  try {
    await createServiceAccount(projectId, appName)
    const cmd = `gcloud beta billing projects describe ${projectId}`
    const { promisify } = require('util')
    const exec = promisify(require('child_process').exec)

    const output = await exec(cmd)

    if (output.stderr.trim() !== '') {
      console.log(output.stderr.trim())
      return false
    }

    // Extracting 'billingEnabled' value from output
    const lines = output.stdout.split('\n')
    for (const line of lines) {
      if (line.startsWith('billingEnabled:')) {
        const billingEnabled = line.split(':')[1].trim() === 'true' // getting the value after ':' and converting it to boolean
        return billingEnabled
      }
    }

    console.error('No billingEnabled info found')
    return false
  } catch (error) {
    return false
  }
}

export const enableBillingIam = async (projectId: string) => {
  const billingService = 'billing.accounts.get'
  await enablePermission(projectId, billingService)
}

export const addBillingRole = async (projectId: string, appName: string) => {
  const billingRole = 'billing.resourceAssociations.list'
  await addRole(projectId, appName, billingRole)
}

export const projectIdNotExists = async (projectId: string) => {
  if (projectId.length < 4) return false

  const cmd = `gcloud projects list --filter ${projectId}`
  const { promisify } = require('util')
  const exec = promisify(require('child_process').exec)

  const output = await exec(cmd)
  console.log(output.stderr.trim())
  return output.stderr.trim() !== ''
}
