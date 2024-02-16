import { LOG } from '@/config/log'
import { PATH } from '@/config/path'
import { lang } from '@/index'
import { Logger } from '@/lib'
import { appendLineToFile } from '@/templates/instanceTypes'
import { toCamelCase } from '@/utils/string'
import { toUpperCase } from '@skeet-framework/utils'
import chalk from 'chalk'
import { existsSync, mkdirSync, writeFileSync } from 'fs'

export const genModel = (modelName: string) => {
  try {
    const camel = toCamelCase(modelName)
    const capital = toUpperCase(modelName)
    if (!existsSync(PATH.MODEL)) {
      mkdirSync(PATH.MODEL, { recursive: true })
    }
    const filePath = `${PATH.MODEL}/${modelName}Models.ts`
    if (existsSync(filePath)) {
      console.log(chalk.yellow(`⚠️ Already Exist - ${filePath}`))
      return false
    }
    const modelIndexPath = `${PATH.MODEL}/index.ts`
    if (!existsSync(modelIndexPath)) {
      writeFileSync(modelIndexPath, '')
    }
    const body = `import { Timestamp, FieldValue } from '@skeet-framework/firestore'

/**
 * This module defines models for the ${capital} and ${capital}Child collections in Firestore.
 * These models are part of the Skeet Framework Sample Models.
 *
 * Collection IDs and Document IDs are customizable.
 */

/**
 * Collection name for ${capital}
 */
export const ${capital}CN = '${capital}'

/**
 * Collection name for ${capital}Child
 */
export const ${capital}ChildCN = '${capital}Child'

/**
 * Represents a document in the ${capital} collection.
 *
 * @collectionId ${capital}
 * @documentId auto-generated
 * @path \${${capital}CN}
 */
export type ${capital} = {
  id?: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
}


/**
 * Utility function to generate the Firestore path for a '${capital}Child' document.
 *
 * @param {string} ${camel}Id - The ID of the '${capital}' document.
 * @returns {string} The Firestore path for the '${capital}Child' document.
 */
export const get${capital}ChildPath = (${camel}Id: string) =>
  \`\${${capital}CN}/\${${camel}Id}/\${${capital}ChildCN}\`

/**
 * Type definition for documents in the '${capital}Child' collection.
 *
 * @collectionId ${capital}Child
 * @documentId auto-generated
 * @path \${${capital}CN}/\${${capital}Id}/\${${capital}ChildCN}
 */
export type ${capital}Child = {
  id?: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
}
`
    writeFileSync(filePath, body)
    const indexLine = `export * from './${camel}Models'`
    appendLineToFile(modelIndexPath, indexLine)
    Logger.successCheck(`successfully created - ${filePath}`)
    return true
  } catch (error) {
    throw new Error(`genModel: ${error}`)
  }
}
