import { SkeetTemplate } from '@/types/skeetTypes'

export const prettierignore = async (appName: string, template: string) => {
  const filePath = `${appName}/.prettierignore`
  let body = ''
  if (
    template === SkeetTemplate.ExpoFirestore ||
    template == SkeetTemplate.SolanaFirestore
  ) {
    body = `out
dist
build
.expo
web-build
tmp
`
  } else if (template === SkeetTemplate.NextJsFirestore) {
    body = `out
dist
build
web-build
.next
tmp
  `
  } else if (template === SkeetTemplate.NextJsGraphQL) {
    body = `.next
out
dist
build
src/__generated__
src/schema.graphql
tmp
`
  }
  return {
    filePath,
    body,
  }
}
