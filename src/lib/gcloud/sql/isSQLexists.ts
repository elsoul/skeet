import { execSync } from 'child_process'

export const isSQLexists = async (projectId: string, instanceName: string) => {
  try {
    const cmd = `gcloud sql instances describe ${instanceName} --project ${projectId}`
    const dbExists = String(execSync(cmd))
    return dbExists.includes('state: RUNNABLE')
  } catch (error) {
    return false
  }
}
