import { SkeetTemplate } from '@/types/skeetTypes'

export const eslintignore = async (appName: string, template: string) => {
  const filePath = `${appName}/.eslintignore`
  let body = ''
  if (template === SkeetTemplate.ExpoFirestore) {
    body = `out
dist
build
node_modules
web-build  
tmp
  `
  } else if (template === SkeetTemplate.NextJsFirestore) {
    body = `out
dist
build
node_modules
web-build
.next
tmp
  `
  } else if (template === SkeetTemplate.NextJsGraphQL) {
    body = `out
dist
build
node_modules
web-build
.next
src/__generated__
src/schema.graphql
tmp
  `
  } else if (template === SkeetTemplate.SolanaFirestore) {
    body = `out
dist
build
node_modules
web-build
.next
tmp
  `
  }

  return {
    filePath,
    body,
  }
}
