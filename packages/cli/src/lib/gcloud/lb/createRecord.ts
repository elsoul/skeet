import { spawnSync } from 'node:child_process'

export const createRecord = async (
  projectId: string,
  zone: string,
  domain: string,
  loadBalancerIp: string,
  isUpdate: boolean = false,
  recordType: string = 'A',
  ttl: string = '30',
) => {
  const method = isUpdate ? 'update' : 'create'
  const shCmd = [
    'gcloud',
    'dns',
    'record-sets',
    method,
    domain,
    '--rrdatas',
    loadBalancerIp,
    '--ttl',
    ttl,
    '--type',
    recordType,
    '--zone',
    zone,
    '--project',
    projectId,
  ]
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit', shell: true })
}

export const createCaaRecords = async (
  projectId: string,
  zone: string,
  domain: string,
) => {
  const defaultRecord = await caaSslDefaultConf(projectId, zone)
  return await createRecord(
    projectId,
    zone,
    domain,
    defaultRecord.rrdatas,
    false,
    defaultRecord.recordType,
    defaultRecord.ttl,
  )
}

export const caaSslDefaultConf = async (projectId: string, zone: string) => {
  return {
    rrdatas: `\'0 issue "pki.goog",0 issue "letsencrypt.org"\'`,
    ttl: '300',
    recordType: 'CAA',
  }
}
