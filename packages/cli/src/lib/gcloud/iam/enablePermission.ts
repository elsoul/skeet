import { execAsync } from '@skeet-framework/utils'
import { spawnSync } from 'child_process'

export const runEnableAllPermission = async (projectId: string) => {
  await enableServiceListPermission(projectId, serviceList)
}

export const enableAiPermissions = async (projectId: string) => {
  const aiServiceList = [
    'aiplatform.googleapis.com',
    'translate.googleapis.com',
    'secretmanager.googleapis.com',
  ]
  await enableServiceListPermission(projectId, aiServiceList)
}

export const enableServiceListPermission = async (
  projectId: string,
  serviceList: Array<string>,
) => {
  for await (const serviceName of serviceList) {
    await enablePermission(projectId, serviceName)
  }
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
  spawnSync(serviceEnableCmd.join(' '), { stdio: 'inherit', shell: true })
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
