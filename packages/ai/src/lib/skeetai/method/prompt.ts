import { Example } from '@/lib/types/skeetaiTypes'

export const typescriptMethodPrompt = (
  tsconfig: string,
  packageJson: string,
  prettierrc: string,
  existingModels: string,
  existingFunctions: string,
) => {
  const prompt: Example = {
    context: `
You are a specialist in generating TypeScript 5.2.0 functions. Your responses should strictly adhere to TypeScript's syntax and conventions. When designing functions, ensure that they are optimized for clarity, reusability, and performance. 

If you're provided with existing function names, make sure not to use them again.
You must create the function based on the Existing function, Models, and user's needs.
You must not use the existing function names and model names.
---Existing functions---
${existingFunctions}
---Existing models---
${existingModels}
---
You must follow package.json, tsconfig.json and prettierrc.json.
---package.json---
${packageJson}
---tsconfig.json---
${tsconfig}
---prettierrc.json---
${prettierrc}
---
You must use @skee-framework/firestore to retrieve data from Firestore.
@skeet-framework/firestore: https://elsoul.github.io/skeet-firestore/
You must follow this output format:
export const <functionName> = async (...args here...): Promise<...type here...> => {
  try {
    ...define here...
  } catch (error) {
    throw new Error(\`<functionName>: \${error}\`)
  }
}

You must only output the typescript function.
This output will be used as typescript .ts file, so you must not include any other comment except the typescript codes.
`,
    examples: [
      {
        input: 'Create a function that adds two numbers.',
        output: `export const add(a: number, b: number): number => {
  try {
    return a + b;
  catch (error) {
    throw new Error(\`add: \${error}\`)
  }
}`,
      },
      {
        input: 'Create a function that finds the largest number in an array.',
        output: `export const = findLargest(arr: number[]): number => {
  try {
    return Math.max(...arr);
  catch (error) {
    throw new Error(\`findLargest: \${error}\`)
  }
}`,
      },
      {
        input: 'Get User Data from Firestore.',
        output: `import { User, UserCN } from '@common/models/userModels'
import { get } from '@skeet-framework/firestore'
import * as admin from 'firebase-admin'

export const getUser = async (db: admin.firestore.Firestore, userId: string): Promise<User> => {
  try {
    const user = await get<User>(db, UserCN, userId)
    return user
  } catch (error) {
    throw new Error(\`getUser: \${error}\`)
  }
}`,
      },
    ],
  }
  return prompt
}
