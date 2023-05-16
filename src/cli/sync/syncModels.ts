import { getDirectoriesRecursively } from '@/lib/getDirs'

export const syncModels = async () => {
  const model = getDirectoriesRecursively('src/models')
}
