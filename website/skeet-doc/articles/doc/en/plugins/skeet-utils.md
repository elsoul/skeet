---
id: skeet-utils
title: Skeet Utils
description: Skeet Utils Plugin
---

# Skeet Utils

This plugin provides a set of utility functions for usual tasks.

5 main functions are provided:

- Http
- String
- Number
- Time
- Encyption

Skeet Utils TypeDoc

- [https://elsoul.github.io/skeet-utils/](https://elsoul.github.io/skeet-utils/)

# Http

## `sendGet` Function

### Description:

Sends a GET request to a specified URL with optional parameters and Bearer Token. Content-Type is set to application/json.

### Parameters:

- `url` (string): The URL to send the GET request to.
- `params` (any, optional): Optional query parameters to be appended to the URL.
- `token` (string, optional): Optional token to be included in the Authorization header.

### Returns:

- (Promise<NodeFetchResponse>): The response from the GET request.

### Example:

```typescript
const response = await sendGet(
  'https://api.example.com/data',
  { q: 'searchTerm' },
  'mytoken123'
)
const data = await response.json()
console.log(data)
```

### Implementation:

```typescript
export const sendGet = async (
  url: string,
  params?: any,
  token?: string
): Promise<NodeFetchResponse> => {
  try {
    let headers: RequestInit['headers'] = { 'Content-Type': 'application/json' }
    let urlWithParams = url
    if (params) {
      const queryParams = new URLSearchParams(params).toString()
      urlWithParams = `${url}?${queryParams}`
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const res = await fetch(urlWithParams, {
      method: 'GET',
      headers,
    })
    return res as NodeFetchResponse
  } catch (e) {
    console.log({ e })
    throw new Error('sendGET failed')
  }
}
```

## `sendPost` Function

### Description:

Sends a POST request to a specified URL with a given body and Bearer Token. Content-Type is set to application/json.

### Parameters:

- `url` (string): The URL to send the POST request to.
- `body` (T): The body of the POST request.
- `token` (string, optional): Optional token to be included in the Authorization header.

### Returns:

- (Promise<NodeFetchResponse>): The response from the POST request.

### Example:

```typescript
const response = await sendPost<{ name: string }>(
  'https://api.example.com/users',
  { name: 'Alice' },
  'mytoken123'
)
const data = await response.json()
console.log(data)
```

### Implementation:

```typescript
export const sendPost = async <T>(
  url: string,
  body: T,
  token?: string
): Promise<NodeFetchResponse> => {
  try {
    let headers: RequestInit['headers'] = { 'Content-Type': 'application/json' }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })
    return response
  } catch (e) {
    console.log({ e })
    throw new Error(`sendPost failed: ${JSON.stringify(body)}`)
  }
}
```

# String

## `convertToKebabCase` Function

### Description:

Converts a string to kebab case.

### Parameters:

- `str` (string): The input string to be converted.

### Returns:

- (string): The kebab case version of the input string.

### Example:

```typescript
const inputString = 'convertToKebabCase'
const kebabCaseString = convertToKebabCase(inputString)
console.log(kebabCaseString) // "convert-to-kebab-case"
```

---

## `convertFromKebabCaseToLowerCase` Function

### Description:

Converts a kebab case string to lower case.

### Parameters:

- `str` (string): The input string in kebab case.

### Returns:

- (string): The lower case version of the input string.

### Example:

```typescript
const inputString = 'convert-to-kebab-case'
const lowerCaseString = convertFromKebabCaseToLowerCase(inputString)
console.log(lowerCaseString) // "converttokebabcase"
```

---

## `toPascalCase` Function

### Description:

Converts a string to Pascal case.

### Parameters:

- `str` (string): The input string to be converted.

### Returns:

- (string): The Pascal case version of the input string.

### Example:

```typescript
const inputString = 'to_pascal_case'
const pascalCaseString = toPascalCase(inputString)
console.log(pascalCaseString) // "ToPascalCase"
```

---

## `toCamelCase` Function

### Description:

Converts a string to Camel case.

### Parameters:

- `str` (string): The input string to be converted.

### Returns:

- (string): The Camel case version of the input string.

### Example:

```typescript
const inputString = 'to_camel_case'
const camelCaseString = toCamelCase(inputString)
console.log(camelCaseString) // "toCamelCase"
```

---

## `toUpperCase` Function

### Description:

Converts the first character of a string to upper case.

### Parameters:

- `str` (string): The input string.

### Returns:

- (Promise<string>): The input string with the first character in upper case.

### Example:

```typescript
const inputString = 'hello'
const upperCaseString = await toUpperCase(inputString)
console.log(upperCaseString) // "Hello"
```

---

## `toLowerCase` Function

### Description:

Converts the first character of a string to lower case.

### Parameters:

- `str` (string): The input string.

### Returns:

- (Promise<string>): The input string with the first character in lower case.

### Example:

```typescript
const inputString = 'World'
const lowerCaseString = await toLowerCase(inputString)
console.log(lowerCaseString) // "world"
```

# Number

## `getRandomInt` Function

### Description:

Generates a random integer within the specified range.

### Parameters:

- `min` (number): The minimum value of the range (inclusive). Default is 1.
- `max` (number): The maximum value of the range (inclusive). Default is 10.

### Returns:

- (number): A random integer within the specified range.

### Example:

```typescript
const randomNum = getRandomInt(5, 20)
console.log(randomNum) // Random integer between 5 and 20 (inclusive)
```

### Implementation:

```typescript
export const getRandomInt = (min: number = 1, max: number = 10): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
```

# Time

## `sleep` Function

### Description:

Sleeps for the specified number of milliseconds.

### Parameters:

- `ms` (number): The number of milliseconds to sleep.

### Returns:

- (Promise<void>): A promise that resolves after the specified time.

### Example:

```typescript
async function main() {
  console.log('Start')
  await sleep(2000) // Sleep for 2 seconds
  console.log('End') // Printed after sleep
}
main()
```

## `utcNow` Function

### Description:

Returns the current UTC time.

### Returns:

- (Date): The current UTC time.

### Example:

```typescript
const now = utcNow()
console.log(now) // Current UTC time
```

# Encryption

# Module: crypto

Default values for the crypto module.

```ts
export const algorithm = 'aes-256-cbc'
export const inputEncoding = 'utf8'
export const outputEncoding = 'base64'
```

## `encrypt` Function

### Description:

Encrypts data using the given parameters.

### Parameters:

- `data` (string): The data to be encrypted.
- `iv` (string): The initialization vector.
- `password` (string): The password for encryption.
- `salt` (string): The salt for key derivation.

### Returns:

- (string): The encrypted data.

### Example:

```typescript
const data = 'Sensitive information'
const iv = '1234567890123456' // 16 characters
const password = 'MySecretPassword'
const salt = 'MySalt'
const encrypted = encrypt(data, iv, password, salt)
console.log(encrypted)
```

### Implementation:

```typescript
export const encrypt = (
  data: string,
  iv: string,
  password: string,
  salt: string
): string => {
  try {
    const key = scryptSync(password, salt, 32)
    const cipher = createCipheriv(
      algorithm,
      key,
      Buffer.from(iv, outputEncoding)
    )
    let cipheredData = cipher.update(data, inputEncoding, outputEncoding)
    cipheredData += cipher.final(outputEncoding)
    return cipheredData
  } catch (error) {
    throw new Error(`encrypt: ${error}`)
  }
}
```

## `decrypt` Function

### Description:

Decrypts data using the given parameters.

### Parameters:

- `encryptedData` (string): The encrypted data.
- `iv` (string): The initialization vector.
- `password` (string): The password for decryption.
- `salt` (string): The salt for key derivation.

### Returns:

- (string): The decrypted data.

### Example:

```typescript
const encrypted = 'EncryptedDataHere' // Encrypted data obtained from the encryption process
const iv = '1234567890123456' // Initialization vector used in the encryption process
const password = 'MySecretPassword' // Password used in the encryption process
const salt = 'MySalt' // Salt used in the encryption process
const decrypted = decrypt(encrypted, iv, password, salt)
console.log(decrypted)
```

### Implementation:

```typescript
export const decrypt = (
  encryptedData: string,
  iv: string,
  password: string,
  salt: string
): string => {
  try {
    const key = scryptSync(password, salt, 32)
    const decipher = createDecipheriv(
      algorithm,
      key,
      Buffer.from(iv, outputEncoding)
    )
    let decryptedData = decipher.update(
      encryptedData,
      outputEncoding,
      inputEncoding
    )
    decryptedData += decipher.final(inputEncoding)
    return decryptedData
  } catch (error) {
    throw new Error(`decrypt: ${error}`)
  }
}
```

## `generateIv` Function

### Description:

Generates a random initialization vector (IV) for encryption.

### Returns:

- (string): The generated initialization vector as a base64-encoded string.

### Example:

```typescript
const iv = generateIv()
console.log(iv) // Random base64-encoded initialization vector
```

### Implementation:

```typescript
export const generateIv = (): string => {
  try {
    const iv = randomBytes(16)
    return Buffer.from(iv).toString(outputEncoding)
  } catch (error) {
    throw new Error(`generateIv: ${error}`)
  }
}
```

## `generateRandomSalt` Function

### Description:

Generates a random salt for key derivation.

### Parameters:

- `bytes` (number): The number of bytes for the generated salt. Default is 16 bytes.

### Returns:

- (string): The generated salt as a hexadecimal string.

### Example:

```typescript
const salt = generateRandomSalt()
console.log(salt) // Random hexadecimal salt
```

### Implementation:

```typescript
export function generateRandomSalt(bytes = 16): string {
  try {
    return randomBytes(bytes).toString('hex')
  } catch (error) {
    throw new Error(`generateRandomSalt: ${error}`)
  }
}
```

## `gravatarIconUrl` Function

### Description:

Generates a Gravatar icon URL for the given email address.

### Parameters:

- `email` (string): The email address to generate the Gravatar icon URL for.

### Returns:

- (string): The Gravatar icon URL.

### Example:

```typescript
const email = 'user@example.com'
const gravatarUrl = gravatarIconUrl(email)
console.log(gravatarUrl) // Gravatar icon URL
```

### Implementation:

```typescript
export const gravatarIconUrl = (email: string): string => {
  try {
    const md5Hash = createHash('md5')
    const trimmedEmail = email.trim().toLowerCase()
    const hash = md5Hash.update(trimmedEmail).digest('hex')
    return `https://www.gravatar.com/avatar/${hash}?d=retro&s=256`
  } catch (error) {
    throw new Error(`gravatarIconUrl: ${error}`)
  }
}
```

## `encodeBase64` Function

### Description:

Encodes a payload to base64.

### Parameters:

- `payload` (string): The data to be encoded.

### Returns:

- (string): The base64-encoded payload.

### Example:

```typescript
const data = 'Hello, world!'
const encodedData = encodeBase64(data)
console.log(encodedData) // Base64-encoded data
```

### Implementation:

```typescript
export const encodeBase64 = (payload: string): string => {
  return Buffer.from(payload).toString('base64')
}
```

---

## `decodeBase64` Function

### Description:

Decodes a base64-encoded payload to a string.

### Parameters:

- `payload` (string): The base64-encoded data to be decoded.

### Returns:

- (string): The decoded payload as a UTF-8 string.

### Example:

```typescript
const encodedData = 'SGVsbG8sIHdvcmxkIQ==' // Base64-encoded data
const decodedData = decodeBase64(encodedData)
console.log(decodedData) // Decoded data: "Hello, world!"
```

### Implementation:

```typescript
export const decodeBase64 = (payload: string): string => {
  return Buffer.from(payload, 'base64').toString('utf-8')
}
```
