import { getNetworkConfig, importConfig } from '@/lib'
import { spawnSync } from 'child_process'

export type PatchOptions = {
  activation: string
  ips: string
  network: string
}

export const patchSQL = async (
  projectId: string,
  instanceName: string,
  activation: string = '',
  ips: string = '',
  network: string = '',
) => {
  const config = importConfig()
  const { networkName } = getNetworkConfig(projectId, config.app.name)
  const shCmd = [
    'gcloud',
    'sql',
    'instances',
    'patch',
    instanceName,
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
      '--quiet',
    )
  }
  if (patchOption.network !== '') {
    shCmd.push('--network', networkName)
  }
  spawnSync(shCmd[0], shCmd.slice(1), { stdio: 'inherit' })
}
