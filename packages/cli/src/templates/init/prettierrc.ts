export const prettierrc = async (appName: string) => {
  const filePath = `${appName}/.prettierrc`
  const body = {
    semi: false,
    singleQuote: true,
    plugins: ['prettier-plugin-tailwindcss'],
    pluginSearchDirs: false,
    printWidth: 80,
  }
  return {
    filePath,
    body,
  }
}
