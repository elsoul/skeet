import { getNetworkConfig } from '@/lib'
import { spawnSync } from 'child_process'

export type PatchOptions = {
  activation: string
  ips: string
  network: string
}

export const patchSQL = async (
  projectId: string,
  appName: string,
  activation: string = '',
  ips: string = '',
  network: string = ''
) => {
  const networkConfig = await getNetworkConfig(projectId, appName)
  const shCmd = [
    'gcloud',
    'sql',
    'instances',
    'patch',
    networkConfig.instanceName,
    '--project',
    projectId,
  ]
  const patchOption: PatchOptions = {
    activation,
    ips,
    network,
  }
  if (
    patchOption.activation === 'always' ||
    patchOption.activation === 'NEVER'
  ) {
    shCmd.push('--activation-policy', patchOption.activation)
  }
  if (patchOption.ips !== '') {
    shCmd.push(
      '--assign-ip',
      '--authorized-networks',
      patchOption.ips,
      '--quiet'
    )
  }
  if (patchOption.network !== '') {
    shCmd.push('--network', networkConfig.networkName)
  }
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit' })
}
