export const firebaserc = async (appName: string) => {
  const filePath = `${appName}/.firebaserc`
  const body = `{
    "projects": {
      "default": "${appName}"
    }
  }`
  return {
    filePath,
    body,
  }
}
