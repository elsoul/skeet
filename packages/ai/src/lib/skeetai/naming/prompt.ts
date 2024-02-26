import { readdirSync } from 'fs'
import SkeetAI from '@/lib/skeetai'

export const migrationNamingPrompt = {
  context: `You are a specialist in naming functions based on Prisma schemas. Users will provide you with a brief description of the database change they want to implement, primarily focusing on the model name within the Prisma schema. Your task is to return a function name in camelCase that aptly describes the operation and prominently incorporates the model name. For example, when creating a new table or model named "User", it's common to start the function name with "add" like "addUser". The prefix might vary depending on the specific operation described, but the model name should always be central to your naming convention.If you get multiple model names, you can combine them in the function name. For example, if you get "Post" and "Comment", you can return "addPostAndComment".User model is already defined in the schema.prisma file.Skip the User model and focus on the other models.`,
  examples: [
    {
      input: `model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  User      User     @relation(fields: [userId], references: [id])
  userId    Int

  @@unique([userId, title])
}`,
      output: 'addPost',
    },
    {
      input: `model Post {
  id        Int       @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  Comment   Comment[]
  User      User      @relation(fields: [userId], references: [id])
  userId    Int

  @@unique([userId, title])
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  postId    Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  Post      Post     @relation(fields: [postId], references: [id])
}`,
      output: 'addPostAndComment',
    },
    {
      input: 'Add a foreign key to posts referencing users',
      output: 'addForeignKeyToPosts',
    },
    {
      input: 'Change data type of age column in employees table',
      output: 'changeAgeTypeInEmployees',
    },
    {
      input: 'Create a new index on the name column of the products table',
      output: 'addNameIndexToProducts',
    },
  ],
}

export const functionNamingPrompt = (functionNames: string[]) => {
  return {
    context: `You are a specialist in naming TypeScript functions. Users will provide you with a brief description of the function they want to create. Your task is to return a function name related to the described task in camelCase, ranging from 4 to 20 characters. Even if the user's description is vague or unusual, try to come up with the most appropriate name.
    You must not use the same name as the existing function name.
    Existing function names: ${functionNames.join(', ')}
    You must use camelCase.
    You must use 4 to 20 characters.
    You must not use special characters.
    `,
    examples: [
      {
        input: 'Create a user',
        output: 'createUser',
      },
      {
        input: 'Use GitHub API to get user data',
        output: 'getGitHubUserData',
      },
      {
        input: 'Calculate tax for product',
        output: 'calculateProductTax',
      },
      {
        input: 'Transform text to uppercase',
        output: 'transformToUppercase',
      },
      {
        input: 'Find the oldest person in a list',
        output: 'findOldestPerson',
      },
      {
        input: 'Save data to local storage',
        output: 'saveToLocalStorage',
      },
      {
        input: 'Fetch latest news from server',
        output: 'fetchLatestNews',
      },
    ],
  }
}
function readModelFiles(): string[] {
  try {
    let files = readdirSync(SkeetAI.MODEL_PATH)
    files = files.filter((file) => !file.includes('index.ts'))
    return files
  } catch (error) {
    console.log(error)
    return []
  }
}

export const modelNamingPrompt = () => {
  return {
    context: `You are a specialist in naming TypeScript model file name. Users will provide you with Firestore Model. Your task is to return a model file name related to the described task in camelCase, ranging from 4 to 20 characters. Even if the user's description is vague or unusual, try to come up with the most appropriate name. You can use the following rules to name the model file name.
    you must use camelCase.
    you must use 4 to 20 characters.
    you must not use special characters.
    you must not use numbers.
    you must not use spaces.
    you must not use the same name as the existing model file name.
    Exisiting model file names: ${readModelFiles().join(', ')}
    you must use <filename>Models.ts as the file name.
    your task is to return <filename>Models.ts as the file name.
    `,
    examples: [
      {
        input: `import { Timestamp, FieldValue } from '@skeet-framework/firestore'
  
  // CollectionId: User
  // DocumentId: auto
  // Path: User
  export const UserCN = 'User'
  export type User = {
    id?: string
    uid: string
    username: string
    email: string
    iconUrl: string
    createdAt?: Timestamp | FieldValue
    updatedAt?: Timestamp | FieldValue
  }
  
  // CollectionId: Post
  // DocumentId: auto
  // Path: User/\${UserId}/Post
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
        output: 'postModels.ts',
      },
      {
        input: `import { Timestamp, FieldValue } from '@skeet-framework/firestore
  
  // CollectionId: User
  // DocumentId: auto
  // Path: User
  export const UserCN = 'User'
  export type User = {
    id?: string
    uid: string
    username: string
    email: string
    iconUrl: string
    createdAt?: Timestamp | FieldValue
    updatedAt?: Timestamp | FieldValue
  }
  
  // CollectionId: Post
  // DocumentId: auto
  // Path: User/\${UserId}/Post
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
  
  // CollectionId: Comment
  // DocumentId: auto
  // Path: User/\${UserId}/Post/\${PostId}/Comment
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
        output: 'postComentModels.ts',
      },
    ],
  }
}
