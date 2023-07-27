import { SkeetTemplate } from '@/types/skeetTypes'

export const prettierignore = async (appName: string, template: string) => {
  const filePath = `${appName}/.prettierignore`
  let body = ''
  if (template === SkeetTemplate.ExpoFirestore) {
    body = `
.next
out
dist
build
src/__generated__
src/schema.graphql
  `
  } else if (
    template === SkeetTemplate.NextJsFirestore ||
    template === SkeetTemplate.NextJsGraphQL
  ) {
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
