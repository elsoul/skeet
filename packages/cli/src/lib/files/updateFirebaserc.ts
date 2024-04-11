import { FIREBASERC_PATH } from '@/index'
import { checkFileDirExists } from './checkFileDirExists'
import { readFile, writeFile } from 'fs/promises'

export const updateFirebaserc = async (projectId: string) => {
  if (!(await checkFileDirExists(FIREBASERC_PATH))) {
    await writeFile(
      FIREBASERC_PATH,
      JSON.stringify({ projects: { default: projectId } }, null, 2),
    )
    return
  }
  const firebaserc = JSON.parse(await readFile(FIREBASERC_PATH, 'utf-8'))
  firebaserc.projects.default = projectId
  await writeFile(FIREBASERC_PATH, JSON.stringify(firebaserc, null, 2))
}
