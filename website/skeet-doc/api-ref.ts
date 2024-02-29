import fs from 'fs'
;[
  'create',
  'server',
  'deploy',
  'init',
  'iam',
  'yarn',
  'add',
  'sync',
  'delete',
  'login',
  'token',
  'list',
  'curl',
  'test',
  'help',
].forEach((item) => {
  const filePath = `articles/doc/en/api-reference/skeet-cli-${item}.md`
  const body = `---
  id: skeet-cli-${item}
  title: skeet ${item}
  description: skeet ${item} command
---
  `
  const res = fs.writeFileSync(filePath, body)
  console.log(res)
})
