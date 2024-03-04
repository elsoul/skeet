import { readFile, writeFile } from 'fs/promises'

export const updateDefaultIndex = async (instanceName: string) => {
  const sqlPath = instanceName.replace('sql-', '')
  const filePath = `sql/${sqlPath}/src/index.ts`
  const fileBody = (await readFile(filePath, 'utf8')).split('\n')
  const newFileBody = fileBody.map((line) => {
    if (line.includes('const rootDir =')) {
      return `const rootDir = '/${instanceName}'`
    }
    return line
  })
  await writeFile(filePath, newFileBody.join('\n'))
}
