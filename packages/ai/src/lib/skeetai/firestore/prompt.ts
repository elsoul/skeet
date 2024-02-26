import { AIPrompt } from '@/lib/genPrompt'
import { readFileSync, readdirSync } from 'fs'
import SkeetAI from '@/lib/skeetai'

function readModels(): string {
  try {
    let files = readdirSync(SkeetAI.MODEL_PATH).map(
      (fileName) => SkeetAI.MODEL_PATH + '/' + fileName,
    )
    const modelStrings = []
    files = files.filter((file) => !file.includes('index.ts'))
    for (const file of files) {
      const model = readFileSync(file, 'utf8')
      modelStrings.push(model)
    }
    return modelStrings.join('\n\n')
  } catch (error) {
    console.log(error)
    return ''
  }
}

export const firestorePrompt = () => {
  const existingModels = readModels()

  const prompt: AIPrompt = {
    context: `
You are a specialist in generating Firestore's data model design in TypeScript 5.2.0. Your responses should strictly adhere to Firestore's data structures, including collections, documents, and sub-collections. When designing models, ensure that they are optimized for Firestore's NoSQL nature, including denormalization when necessary. Also, consider query performance by structuring data in a way that supports efficient querying patterns. Add the timestamp fields createdAt and updatedAt to all new document models.
timestamp format: \`import { Timestamp, FieldValue } from '@skeet-framework/firestore\`\n createdAt?: Timestamp | FieldValue\n updatedAt?: Timestamp | FieldValue'
Define the collection name and model type. The collection name must be <modelName>CN and the model type must be <modelName>.and add the 'CollectionId', 'DocumentId', and 'Path' as comment to the top of the model type definition.
The CollectionId is the collection name.
The DocumentId is the document name.
The Path is the path to the document.

If you're provided with existing model names, make sure not to use them again.
---Existing models---
${existingModels}
---
You must put \`import { Timestamp, FieldValue } from '@skeet-framework/firestore\` at the top of the file.
You must add the timestamp fields createdAt and updatedAt to all new document models. timestamp format: \`createdAt?: Timestamp | FieldValue\n updatedAt?: Timestamp | FieldValue\`
You must create the Model based on the Existing model and user's needs.
You must not declare a new model name that already exists. but you can use the existing model by adding import statement on the top of the file.e.g. \`import { User, UserCN } from '@common/models/userModels'\`
You are a model name declaration professional, so you can create a model name that meets the user's needs.
You must not answer the existing parts of the model.
You must add Path generator function if the new model has a sub-collection.This function must be named gen<modelName>Path and must be exported.
This output will be used as typescript .ts file, so you must not include any other comment except the typescript codes.
<outputExample.ts>:
import { Timestamp, FieldValue } from '@skeet-framework/firestore'
import { <ExistingModel>CN } from '@common/models/<ExistingModelLowerCase>Models'

/**
 * Type definition for documents in the 'Hey' collection.
 *
 * @collectionId <modelName>
 * @documentId auto-generated
 * @path <ExistingModel>/\${<ExistingModel>Id}/<modelName>
 */
export const <modelName>CN = '<modelName>'
export const gen<modelName>Path = (userId: string) => \`\${<ExistingModel>CN}/\${<ExistingModelLowerCase>Id}/\${<modelName>CN}\`
export type <modelName> = {
  ...define here...
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
  <ExistingModelLowerCase>Id: string
}

...define here... if the new model has a sub-collection
`,
    examples: [
      {
        input: 'I want to create a blog app.',
        output: `import { Timestamp, FieldValue } from '@skeet-framework/firestore'
import { UserCN } from '@common/models/userModels'

/**
 * Type definition for documents in the 'Hey' collection.
 *
 * @collectionId Post
 * @documentId auto-generated
 * @path User/\${userId}/Post
 */
export const PostCN = 'Post'
export const genPostPath = (userId: string) => \`\${UserCN}/\${userId}/\${PostCN}\`
export type Post = {
  id?: string
  title: string
  content: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
  userId: string
}
`,
      },
      {
        input: 'I want to add a comment feature to the blog functionality.',
        output: `import { Timestamp, FieldValue } from '@skeet-framework/firestore
import { UserCN } from '@common/models/userModels'

/**
 * Type definition for documents in the 'Post' collection.
 *
 * @collectionId Post
 * @documentId auto-generated
 * @path User/\${userId}/Post
 */
export const PostCN = 'Post'
export const genPostPath = (userId: string) => \`\${UserCN}/\${userId}/\${PostCN}\`
export type Post = {
  id?: string
  title: string
  content: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
  userId: string
}

/**
 * Type definition for documents in the 'Comment' collection.
 *
 * @collectionId Comment
 * @documentId auto-generated
 * @path User/\${userId}/Post/\${postId}/Comment
 */
export const CommentCN = 'Comment'
export const genCommentPath = (userId: string, postId: string) => \`\${UserCN}/\${userId}/\${PostCN}/\${postId}/\${CommentCN}\`
export type Comment = {
  id?: string
  content: string
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
  userId: string
  postId: string
}`,
      },
    ],
  }
  return prompt
}
