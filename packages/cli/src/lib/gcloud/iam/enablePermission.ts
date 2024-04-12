import { execAsync } from '@skeet-framework/utils'

export const runEnableAllPermission = async (projectId: string) => {
  return await enableServiceListPermission(projectId, serviceList)
}

export const enableServiceListPermission = async (
  projectId: string,
  serviceList: Array<string>,
) => {
  const results = []
  for await (const serviceName of serviceList) {
    results.push(await enablePermission(projectId, serviceName))
  }
  return results
}

export const enablePermission = async (
  projectId: string,
  serviceName: string,
) => {
  const serviceEnableCmd = [
    'gcloud',
    'services',
    'enable',
    serviceName,
    '--project',
    projectId,
  ]
  return await execAsync(serviceEnableCmd.join(' '))
}

export const serviceList = [
  'compute.googleapis.com',
  'iam.googleapis.com',
  'dns.googleapis.com',
  'sqladmin.googleapis.com',
  'sql-component.googleapis.com',
  'servicenetworking.googleapis.com',
  'containerregistry.googleapis.com',
  'artifactregistry.googleapis.com',
  'run.googleapis.com',
  'vpcaccess.googleapis.com',
  'cloudscheduler.googleapis.com',
  'cloudresourcemanager.googleapis.com',
  'translate.googleapis.com',
  'firestore.googleapis.com',
  'cloudfunctions.googleapis.com',
  'cloudtasks.googleapis.com',
  'cloudbuild.googleapis.com',
  'firebasehosting.googleapis.com',
  'secretmanager.googleapis.com',
  'firebaserules.googleapis.com',
  'aiplatform.googleapis.com',
  'sheets.googleapis.com',
]
