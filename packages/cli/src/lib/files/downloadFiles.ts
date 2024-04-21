import {execAsync} from '@skeet-framework/utils'

export const downloadTemplate = async (
  template: string,
  version: string,
): Promise<boolean> => {
  const fileName = `${template}-${version}.tgz`
  const fileUrl = `https://registry.npmjs.org/@skeet-framework/${template}/-/${fileName}`
  const cmd = `curl ${fileUrl} -o ${fileName} --fail --silent --show-error `
  const downloadTemplate = await execAsync(cmd)
  if (downloadTemplate.stderr) {
    console.error('Error downloading file:', downloadTemplate.stderr)
    return false
  }
  return true
}
