import { FUNCTIONS_PATH, Logger } from '@/lib'
import { appendLineToFile } from '@/templates/instanceTypes'
import { toCamelCase } from '@/utils/string'
import { toUpperCase } from '@skeet-framework/utils'
import { writeFileSync } from 'fs'

export const genModel = (functionsName: string, modelName: string) => {
  try {
    const camel = toCamelCase(modelName)
    const capital = toUpperCase(modelName)
    const filePath = `${FUNCTIONS_PATH}/${functionsName}/src/models/${camel}Models.ts`
    const modelIndexPath = `${FUNCTIONS_PATH}/${functionsName}/src/models/index.ts`
    const body = `import { Timestamp, FieldValue } from '@skeet-framework/firestore''

// ⚡️ This is a Skeet Framework Sample Models ⚡️
// Define Your Model Types
// CollectionId & DocumentId are custamizable

// Define Collection Name
export const ${capital}CN = '${capital}'
export const ${capital}ChildCN = '${capital}Child'

// CollectionId: ${capital}
// ${capital}Id: auto
// Path: \${${capital}CN}
export type ${capital} = {
  id?: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
}

// CollectionId: ${capital}Child
// ${capital}ChildId: auto
// Path: \${${capital}CN}/\${${capital}Id}/\${${capital}ChildCN}
export type ${capital}Child = {
  id?: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
}
`
    writeFileSync(filePath, body)
    const indexLine = `export * from './${camel}Models'`
    appendLineToFile(modelIndexPath, indexLine)
    Logger.successCheck(`Successfully ${filePath} created`)
    return true
  } catch (error) {
    throw new Error(`genModel: ${error}`)
  }
}
