export const apiEnv = async (appName: string) => {
  const filePath = `${appName}/apps/api/.env`
  const body = `NO_PEER_DEPENDENCY_CHECK=1`
  return {
    filePath,
    body,
  }
}
