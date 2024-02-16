export const graphqlEnv = async (appName: string) => {
  const filePath = `${appName}/graphql/.env`
  const body = `DATABASE_URL=postgresql://skeeter:rabbit@localhost:5432/skeet-${appName}-dev?schema=public
NO_PEER_DEPENDENCY_CHECK=1`
  return {
    filePath,
    body,
  }
}
