import { FIREBASERC_PATH } from '@/index'
import { checkFileDirExists } from './checkFileDirExists'
import { readFile, writeFile } from 'fs/promises'

export const updateFirebaserc = async (fbProjectId: string) => {
  if (!(await checkFileDirExists(FIREBASERC_PATH))) {
    await writeFile(
      FIREBASERC_PATH,
      JSON.stringify({ projects: { default: fbProjectId } }, null, 2),
    )
    return
  }
  const firebaserc = JSON.parse(await readFile(FIREBASERC_PATH, 'utf-8'))
  firebaserc.projects.default = fbProjectId
  await writeFile(FIREBASERC_PATH, JSON.stringify(firebaserc, null, 2))
}
