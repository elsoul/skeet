import { spawnSync } from 'child_process'

export const runEnableAllPermission = async (projectId: string) => {
  await enableServiceListPermission(projectId, serviceList)
}

export const enableServiceListPermission = async (
  projectId: string,
  serviceList: Array<string>
) => {
  serviceList.forEach(async (serviceName) => {
    await enablePermission(projectId, serviceName)
  })
}

export const enablePermission = async (
  projectId: string,
  serviceName: string
) => {
  const serviceEnableCmd = [
    'gcloud',
    'services',
    'enable',
    serviceName,
    '--project',
    projectId,
  ]
  spawnSync(serviceEnableCmd[0], serviceEnableCmd.slice(1), {
    stdio: 'inherit',
  })
}

export const serviceList = [
  'compute.googleapis.com',
  'iam.googleapis.com',
  'dns.googleapis.com',
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
  'cloudbuild.googleapis.com',
  'firebasehosting.googleapis.com',
  'secretmanager.googleapis.com',
  'firebaserules.googleapis.com',
]
