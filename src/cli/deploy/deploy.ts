import { execSyncCmd } from '@/lib/execSyncCmd'

export const deploy = async () => {
  const shCmd = ['yarn', 'functions:deploy']
  await execSyncCmd(shCmd)
}
