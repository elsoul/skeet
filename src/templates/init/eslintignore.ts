export const eslintignore = async (appName: string, template: string) => {
  const filePath = `${appName}/.eslintignore`
  let body = ''
  if (template === 'Expo (React Native)') {
    body = `
out
dist
build
node_modules
web-build  
  `
  } else if (template === 'Next.js (React)') {
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
