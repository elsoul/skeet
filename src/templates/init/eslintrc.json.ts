export const eslintrcJson = async (appName: string) => {
  const filePath = `${appName}/.eslintrc.json`
  const body = {
    extends: ['prettier'],
  }
  return {
    filePath,
    body,
  }
}
