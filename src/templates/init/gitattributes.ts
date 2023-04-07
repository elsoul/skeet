export const gitattributes = async (appName: string) => {
  const filePath = `${appName}/.gitattributes`
  const body = `apps/api/.env filter=git-crypt diff=git-crypt
apps/api/.env.build filter=git-crypt diff=git-crypt
apps/api/.env.production filter=git-crypt diff=git-crypt
  `
  return {
    filePath,
    body,
  }
}
