import { execAsyncCmd } from '@/lib/execAsyncCmd'
import { getNetworkConfig } from '@/lib/files/getSkeetConfig'
import { importConfig } from '@/lib/files/importConfig'

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
  const config = await importConfig()
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
  await execAsyncCmd(shCmd)
}
