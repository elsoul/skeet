export const prettierignore = async (appName: string, template: string) => {
  const filePath = `${appName}/.prettierignore`
  let body = ''
  if (template === 'Expo (React Native)') {
    body = `
.next
out
dist
build
src/__generated__
src/schema.graphql
  `
  } else if (template === 'Next.js (React)') {
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
