export const prettierignore = async (appName: string) => {
  const filePath = `${appName}/.prettierignore`
  const body = `
.next
out
dist
build
src/__generated__
src/schema.graphql
  `
  return {
    filePath,
    body,
  }
}
