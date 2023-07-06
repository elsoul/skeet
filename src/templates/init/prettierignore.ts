export const prettierignore = async (appName: string, template: string) => {
  const filePath = `${appName}/.prettierignore`
  let body = ''
  if (template === 'React Native (Expo)') {
    body = `
.next
out
dist
build
src/__generated__
src/schema.graphql
  `
  } else if (template === 'Next.js') {
    body = `
out
dist
build
web-build
.next
  `
  }
  return {
    filePath,
    body,
  }
}
