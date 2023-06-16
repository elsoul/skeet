import { FUNCTIONS_PATH } from '@/lib/getSkeetConfig'
import { Logger } from '@/lib/logger'
import { appendLineToFile, toCamelCase } from '@/templates/instanceTypes'
import fs from 'fs'

export const genModel = (functionsName: string, modelName: string) => {
  try {
    const camel = toCamelCase(modelName)
    const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/models/${camel}Models.ts`
    const modelIndexPath = `${FUNCTIONS_PATH}/${functionsName}/src/models/index.ts`
    const body = `import { Ref } from '@skeet-framework/firestore'

// ⚡️ This is a Skeet Framework Sample Models ⚡️
// Define Your Model Types
// CollectionId & DocumentId are custamizable

// CollectionId: Parent
// DocumentId: uid
export type Parent = {
  createdAt?: string
  updatedAt?: string
}

// CollectionId: Child
// DocumentId: auto
export type Child = {
  parentRef: Ref<Parent>
  createdAt?: string
  updatedAt?: string
}


// CollectionId: GrandChild
// DocumentId: auto
export type GrandChild = {
  childRef: Ref<Child>
  createdAt?: string
  updatedAt?: string
}`
    fs.writeFileSync(filePath, body)
    const indexLine = `export * from './${camel}Models'`
    appendLineToFile(modelIndexPath, indexLine)
    Logger.successCheck(`Successfully ${filePath} created`)
    return true
  } catch (error) {
    throw new Error(`genModel: ${error}`)
  }
}
