import { SkeetTemplate } from '@/types/skeetTypes'

export const eslintignore = async (appName: string, template: string) => {
  const filePath = `${appName}/.eslintignore`
  let body = ''
  if (template === SkeetTemplate.ExpoFirestore) {
    body = `
out
dist
build
node_modules
web-build  
  `
  } else if (
    template === SkeetTemplate.NextJsFirestore ||
    template === SkeetTemplate.NextJsGraphQL
  ) {
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
