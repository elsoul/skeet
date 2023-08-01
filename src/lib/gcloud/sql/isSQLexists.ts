import { importConfig } from '@/lib/files'

export const isSQLexists = async () => {
  try {
    const { db } = await importConfig()
    if (db.whiteList !== '') return true

    return false
  } catch (error) {
    return false
  }
}
