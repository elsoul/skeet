export const prettierrc = async (appName: string) => {
  const filePath = `${appName}/.prettierrc`
  const body = {
    semi: false,
    singleQuote: true,
  }
  return {
    filePath,
    body,
  }
}
