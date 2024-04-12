import { execAsync } from '@skeet-framework/utils'

export const runAddAllRole = async (projectId: string, appName: string) => {
  return await addAllRoles(projectId, appName, roleList)
}

export const addAllRoles = async (
  projectId: string,
  appName: string,
  roleList: Array<string>,
) => {
  const results = []
  for await (const roleName of roleList) {
    results.push(await addRole(projectId, appName, roleName))
  }
  return results
}

export const addRole = async (
  projectId: string,
  appName: string,
  roleName: string,
) => {
  const addRoleCmd = [
    'gcloud',
    'projects',
    'add-iam-policy-binding',
    projectId,
    '--member',
    `serviceAccount:${appName}@${projectId}.iam.gserviceaccount.com`,
    '--role',
    roleName,
  ]
  return await execAsync(addRoleCmd.join(' '))
}

export const roleList = [
  'roles/cloudsql.editor',
  'roles/containerregistry.ServiceAgent',
  'roles/artifactregistry.admin',
  'roles/pubsub.editor',
  'roles/datastore.user',
  'roles/iam.serviceAccountUser',
  'roles/iam.serviceAccountTokenCreator',
  'roles/run.admin',
  'roles/storage.admin',
  'roles/storage.objectAdmin',
  'roles/cloudscheduler.admin',
  'roles/appengine.appCreator',
  'roles/logging.admin',
  'roles/cloudtranslate.admin',
  'roles/compute.networkAdmin',
  'roles/cloudfunctions.admin',
  'roles/firebasehosting.admin',
  'roles/secretmanager.admin',
  'roles/cloudtasks.admin',
  'roles/firebaserules.admin',
  'roles/aiplatform.admin',
  'roles/iam.serviceAccountTokenCreator',
  'roles/run.invoker',
  'roles/eventarc.eventReceiver',
]
