import { genModel } from './genModel'

export const addModel = async (modelName: string) => {
  try {
    genModel(modelName)
    return true
  } catch (error) {
    throw new Error(`addMethod: ${error}`)
  }
}
