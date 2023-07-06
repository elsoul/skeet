export const eslintignore = async (appName: string, template: string) => {
  const filePath = `${appName}/.eslintignore`
  let body = ''
  if (template === 'React Native (Expo)') {
    body = `
out
dist
build
node_modules
web-build  
  `
  } else if (template === 'Next.js') {
    body = `
out
dist
build
node_modules
web-build
.next
  `
  }

  return {
    filePath,
    body,
  }
}
