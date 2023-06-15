export const eslintignore = async (appName: string) => {
  const filePath = `${appName}/.eslintignore`
  const body = `
  out
  dist
  build
  node_modules
  web-build  
  `
  return {
    filePath,
    body,
  }
}
