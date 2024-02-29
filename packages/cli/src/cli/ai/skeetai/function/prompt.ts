import { Example, InstanceType } from '@/lib/types/skeetaiTypes'
import { auth } from './auth'
import { firestore } from './firestore'
import { pubsub } from './pubsub'
import { schedule } from './schedule'
import { http, httpExample } from './http'

export const firebaseFunctionPrompt = (
  tsconfig: string,
  packageJson: string,
  prettierrc: string,
  existingModels: string,
  existingFunctions: string,
  instanceType: InstanceType,
) => {
  let instanceTemplate = ''
  if (instanceType === InstanceType.AUTH) {
    instanceTemplate = auth
  } else if (instanceType === InstanceType.FIRESTORE) {
    instanceTemplate = firestore
  } else if (instanceType === InstanceType.PUBSUB) {
    instanceTemplate = pubsub
  } else if (instanceType === InstanceType.SCHEDULE) {
    instanceTemplate = schedule
  } else if (instanceType === InstanceType.HTTP) {
    instanceTemplate = http
  }
  const prompt: Example = {
    context: `
You are a specialist in generating TypeScript 5.2.0 codes. Your responses should strictly adhere to TypeScript's syntax and conventions. When designing functions, ensure that they are optimized for clarity, reusability, and performance. This code will be used inside the Skeet Framework Template, you must generate <yourScripts> part only.
<Skeet Framework Template>: ${instanceTemplate}

All the necessary packages are already installed, so you don't need to install any packages.
All the necessary functions are already defined in <Existing functions>, so you don't need to define any functions.
All the necessary models are already defined in <Existing models>, so you don't need to define any models.
---<Existing functions>---
${existingFunctions}
---<Existing models>---
${existingModels}
---
You must create the typescript codes based on the Existing function, Models, and user's needs.

You must follow package.json, tsconfig.json and prettierrc.json.
---package.json---
${packageJson}
---tsconfig.json---
${tsconfig}
---prettierrc.json---
${prettierrc}
---
You must use <@skeet-framework/firestore> to retrieve data from Firestore.
<@skeet-framework/firestore>: https://elsoul.github.io/skeet-firestore/
`,
    examples: [
      httpExample,
      {
        input: 'Create a function that finds the largest number in an array.',
        output: `export const = findLargest(arr: number[]): numbe => {
  try {
    return Math.max(...arr);
  catch (error) {
    throw new Error(\`findLargest: \${error}\`)
  }
}`,
      },
    ],
  }
  return prompt
}
