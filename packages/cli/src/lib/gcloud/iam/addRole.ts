import { spawnSync } from 'child_process'

export const runAddAllRole = async (projectId: string, appName: string) => {
  await addAllRoles(projectId, appName, roleList)
}

export const runAiRole = async (projectId: string, appName: string) => {
  const aiRoleList = [
    'roles/aiplatform.admin',
    'roles/cloudtranslate.admin',
    'roles/iam.serviceAccountUser',
  ]
  await addAllRoles(projectId, appName, aiRoleList)
}

export const addAllRoles = async (
  projectId: string,
  appName: string,
  roleList: Array<string>,
) => {
  for await (const roleName of roleList) {
    await addRole(projectId, appName, roleName)
  }
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
  spawnSync(addRoleCmd[0], addRoleCmd.slice(1), { stdio: 'inherit' })
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
