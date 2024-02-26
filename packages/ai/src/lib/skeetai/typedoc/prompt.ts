import { AIPrompt } from '@/lib/genPrompt'
import { tsconfig } from './examples/tsconfig.json'
import { prettierrc } from './examples/prettierrc'
import { eslintrc } from './examples/eslintrc.json'

function readTscofigSet() {
  try {
    const tsconfigJson = tsconfig()
    const prettierrcFile = prettierrc()
    const eslintrcJson = eslintrc()
    return {
      tsconfigJson,
      prettierrcFile,
      eslintrcJson,
    }
  } catch (error) {
    throw new Error(`readTscofigSet: ${error}`)
  }
}

export const typedocPrompt = () => {
  const { tsconfigJson, prettierrcFile, eslintrcJson } = readTscofigSet()

  const prompt: AIPrompt = {
    context: `
You are a specialist in adding descriptions to functions for generating TypeDoc. Make sure to include @example in a clear and understandable manner in the TypeDoc comments. Please also consider the following settings.tsconfig.json: ${tsconfigJson}\n.prettierrc: ${prettierrcFile}\n.eslintrc.json:${eslintrcJson}
- You must output only the typedoc comments.
- You must not include any other comment except the typedoc comments.
- You must not include import statements because the import statements already exist in the file.
- You must output the typedoc comments in the following format:
/**
 * ...description here...
 * @template T - ...description here...
 * @params ...params here...
 * @returns ...returns here...
 * @throws ...throws here...
 * @example
 * ...example here...
 * \`\`\`ts
 * ...code here...
 * \`\`\`
 */
`,
    examples: [
      {
        input: `export const encrypt = (
  data: string,
  iv: string,
  password: string,
  salt: string,
): string => {
  try {
    const key = scryptSync(password, salt, 32)
    const cipher = createCipheriv(
      algorithm,
      key,
      Buffer.from(iv, outputEncoding),
    )
    let cipheredData = cipher.update(data, inputEncoding, outputEncoding)
    cipheredData += cipher.final(outputEncoding)
    return cipheredData
  } catch (error) {
    throw new Error(\`encrypt: \${error}\`)
  }
}
`,
        output: `/**
* @module encrypt
* Encrypts data using the given parameters.
*
* @param data - The data to be encrypted.
* @param iv - The initialization vector.
* @param password - The password for encryption.
* @param salt - The salt for key derivation.
* @returns The encrypted data.
*
* @example
* const data = 'Sensitive information';
* const iv = '1234567890123456'; // 16 characters
* const password = 'MySecretPassword';
* const salt = 'MySalt';
* const encrypted = encrypt(data, iv, password, salt);
* console.log(encrypted);
*/`,
      },
      {
        input: `export const decrypt = (
  encryptedData: string,
  iv: string,
  password: string,
  salt: string,
): string => {
  try {
    const key = scryptSync(password, salt, 32)
    const decipher = createDecipheriv(
      algorithm,
      key,
      Buffer.from(iv, outputEncoding),
    )
    let decryptedData = decipher.update(
      encryptedData,
      outputEncoding,
      inputEncoding,
    )
    decryptedData += decipher.final(inputEncoding)
    return decryptedData
  } catch (error) {
    throw new Error(\`decrypt: \${error}\`)
  }
}`,
        output: `/**
* @module decrypt
* Decrypts data using the given parameters.
*
* @param encryptedData - The encrypted data.
* @param iv - The initialization vector.
* @param password - The password for decryption.
* @param salt - The salt for key derivation.
* @returns The decrypted data.
*
* @example
* const encrypted = 'EncryptedDataHere'; // Encrypted data obtained from the encryption process
* const iv = '1234567890123456'; // Initialization vector used in the encryption process
* const password = 'MySecretPassword'; // Password used in the encryption process
* const salt = 'MySalt'; // Salt used in the encryption process
* const decrypted = decrypt(encrypted, iv, password, salt);
* console.log(decrypted);
*/`,
      },
      {
        input: `get UserChatRoom data from firestore`,
        output: `/**
* @module getUserChatRoom
* Fetches the chat room of a user from the database.
*
* @param db - The Firestore database instance.
* @param userId - The ID of the user.
* @param chatRoomId - The ID of the chat room.
* @returns A promise that resolves to the user's chat room.
* @throws Will throw an error if the chat room cannot be fetched.
*
* @example
* const db = admin.firestore();
* const userId = 'User123';
* const chatRoomId = 'ChatRoom123';
* const userChatRoom = await getUserChatRoom(db, userId, chatRoomId)
* console.log(userChatRoom));
*/`,
      },
    ],
  }
  return prompt
}
