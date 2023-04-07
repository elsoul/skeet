import { execSyncCmd } from '@/lib/execSyncCmd'

export const runAddAllRole = async (projectId: string, appName: string) => {
  await addAllRoles(projectId, appName, roleList)
}

export const addAllRoles = async (
  projectId: string,
  appName: string,
  roleList: Array<string>
) => {
  roleList.forEach(async (roleName) => {
    await addRole(projectId, appName, roleName)
  })
}

export const addRole = async (
  projectId: string,
  appName: string,
  roleName: string
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
  await execSyncCmd(addRoleCmd)
}

export const roleList = [
  'roles/cloudsql.editor',
  'roles/containerregistry.ServiceAgent',
  'roles/pubsub.editor',
  'roles/datastore.user',
  'roles/iam.serviceAccountUser',
  'roles/run.admin',
  'roles/storage.admin',
  'roles/storage.objectAdmin',
  'roles/cloudscheduler.admin',
  'roles/appengine.appCreator',
  'roles/logging.admin',
  'roles/cloudtranslate.admin',
  'roles/cloudtasks.admin',
  'roles/compute.networkAdmin',
]
