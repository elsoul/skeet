export const firebasercInit = async (projectId: string) => {
  const filePath = `.firebaserc`
  const body = `{
    "projects": {
      "default": "${projectId}"
    }
  }`
  return {
    filePath,
    body,
  }
}
