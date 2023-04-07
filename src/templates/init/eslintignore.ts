export const eslintignore = async (appName: string) => {
  const filePath = `${appName}/.eslintignore`
  const body = `
.next
out
dist
build
src/__generated__
src / schema.graphql
  `
  return {
    filePath,
    body,
  }
}
