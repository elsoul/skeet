import { readFileSync, writeFileSync } from 'fs'

export const updateDefaultIndex = (instanceName: string) => {
  const sqlPath = instanceName.replace('sql-', '')
  const filePath = `sql/${sqlPath}/src/index.ts`
  const fileBody = readFileSync(filePath, 'utf8').split('\n')
  const newFileBody = fileBody.map((line) => {
    if (line.includes('const rootDir =')) {
      return `const rootDir = '/${instanceName}'`
    }
    return line
  })
  writeFileSync(filePath, newFileBody.join('\n'))
}
