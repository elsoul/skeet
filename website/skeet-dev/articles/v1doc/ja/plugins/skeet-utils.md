---
id: skeet-utils
title: Skeet Utils
description: Skeet Utils プラグイン
---

## Skeet Utils

このプラグインは、一般的なタスクのためのユーティリティ関数のセットを提供します。

以下の 5 つの主要な関数が提供されています：

- Http
- String
- Number
- Time
- Encryption

Skeet Utils TypeDoc

- [https://elsoul.github.io/skeet-utils/](https://elsoul.github.io/skeet-utils/)

## Http

## `skeetGraphql` 関数

### 説明:

指定したエンドポイントに対して GraphQL クエリを実行します。

### パラメータ:

- `accessToken` (文字列): 認証用のアクセストークン。
- `endpoint` (文字列): GraphQL サーバーのエンドポイント URL。
- `query` (文字列): 実行する GraphQL のクエリ。
- `variables` (V, 任意): GraphQL のクエリで使用する任意の変数。

### 戻り値:

- (Promise<T>): GraphQL クエリの結果を解決するプロミスを返します。

### 例外:

GraphQL クエリが失敗した場合、エラーがスローされます。

### 例：

```typescript
import { skeetGraphql } from '@skeet-framework/utils'
import { User } from '@/models'

const query: CreateUserQuery = `mutation Mutation(
  $uid: String
  $username: String
  $email: String
  $iconUrl: String
) {
  createUser(uid: $uid, username: $username, email: $email, iconUrl: $iconUrl) {
    id
    rawId
    uid
    username
    email
    iconUrl
    role
    iv
    createdAt
    updatedAt
  }
}`
const variables: CreateUserParams = {
  uid: 'あなたの_uid',
  username: 'あなたの_username',
  email: 'あなたの_email',
  iconUrl: 'あなたの_icon_url',
}
const accessToken = 'あなたの_access_token'
const endpoint = 'https://あなたの-production-endpoint.com/graphql'

const user = await skeetGraphql<User, CreateUserParams>(
  accessToken,
  endpoint,
  query
)
console.log(user)
```

### 実装:

```typescript
export const skeetGraphql = async <T, V>(
  accessToken: string,
  endpoint: string,
  query: string,
  variables = {} as V
): Promise<T> => {
  const baseUrl =
    skeetEnv === 'production' ? endpoint : 'http://localhost:3000/graphql'
  console.log({ query })

  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const result: T = await res.json()
    return result
  } catch (error) {
    throw new Error(`skeetGraphql failed: ${error}`)
  }
}
```

## `sendGet` 関数

### 説明：

指定された URL にオプションのパラメータと Bearer トークンを使用して GET リクエストを送信します。Content-Type は application/json に設定されています。

### パラメータ:

- `url` (文字列): GET リクエストを送信する URL。
- `params` (任意, オプション): URL に追加する任意のクエリパラメータ。
- `token` (文字列, オプション): Authorization ヘッダーに含める任意のトークン。

### 戻り値:

- (Promise<NodeFetchResponse>): GET リクエストからのレスポンス。

### 例：

```typescript
const response = await sendGet(
  'https://api.example.com/data',
  { q: 'searchTerm' },
  'mytoken123'
)
const data = await response.json()
console.log(data)
```

### 実装:

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
    throw new Error('sendGETが失敗しました')
  }
}
```

## `sendPost` 関数

### 説明：

指定された URL に、指定された本文と Bearer トークンを含む POST リクエストを送信します。Content-Type は application/json に設定されています。

### パラメータ:

- `url` (文字列): POST リクエストを送信する URL。
- `body` (T): POST リクエストの本文。
- `token` (文字列, 任意): Authorization ヘッダーに含める任意のトークン。

### 戻り値:

- (Promise<NodeFetchResponse>): POST リクエストからのレスポンス。

### 例：

```typescript
const response = await sendPost<{ name: string }>(
  'https://api.example.com/users',
  { name: 'Alice' },
  'mytoken123'
)
const data = await response.json()
console.log(data)
```

### 実装:

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

# 文字列

## `convertToKebabCase` 関数

### 説明:

文字列をケバブケースに変換します。

### パラメータ:

- `str` (string): 変換される入力文字列。

### 戻り値:

- (string): 入力文字列のケバブケースバージョン。

### 例：

```typescript
const inputString = 'convertToKebabCase'
const kebabCaseString = convertToKebabCase(inputString)
console.log(kebabCaseString) // "convert-to-kebab-case"
```

---

## `convertFromKebabCaseToLowerCase` 関数

### 説明:

ケバブケースの文字列を小文字に変換します。

### パラメータ:

- `str` (string): ケバブケースの入力文字列。

### 戻り値:

- (string): 入力文字列の小文字版。

### 例:

```typescript
const inputString = 'convert-to-kebab-case'
const lowerCaseString = convertFromKebabCaseToLowerCase(inputString)
console.log(lowerCaseString) // "converttokebabcase"
```

---

## `toPascalCase` 関数

### 説明:

文字列をパスカルケースに変換します。

### パラメータ:

- `str` (string): 変換される入力文字列。

### 戻り値:

- (string): 入力文字列のパスカルケースバージョン。

### 例：

```typescript
const inputString = 'to_pascal_case'
const pascalCaseString = toPascalCase(inputString)
console.log(pascalCaseString) // "ToPascalCase"
```

---

## `toCamelCase` 関数

### 説明:

文字列をキャメルケースに変換します。

### パラメータ:

- `str` (string): 変換される入力文字列。

### 戻り値:

- (string): 入力文字列のキャメルケースバージョン。

### 例:

```typescript
const inputString = 'to_camel_case'
const camelCaseString = toCamelCase(inputString)
console.log(camelCaseString) // "toCamelCase"
```

---

## `toUpperCase` 関数

### 説明：

文字列の最初の文字を大文字に変換します。

### パラメータ:

- `str` (string): 入力文字列。

### 戻り値:

- (Promise<string>): 入力文字列の最初の文字を大文字にしたもの。

### 例：

```typescript
const inputString = 'hello'
const upperCaseString = await toUpperCase(inputString)
console.log(upperCaseString) // "Hello"
```

---

## `toLowerCase` 関数

### 説明:

文字列の最初の文字を小文字に変換します。

### パラメータ:

- `str` (string): 入力文字列。

### 戻り値:

- (Promise<string>): 入力文字列の最初の文字を小文字にしたもの。

### 例：

```typescript
const inputString = 'World'
const lowerCaseString = await toLowerCase(inputString)
console.log(lowerCaseString) // "world"
```

# 数字

## `getRandomInt` 関数

### 説明：

指定された範囲内でランダムな整数を生成します。

### パラメータ:

- `min` (数値): 範囲の最小値（含む）。デフォルトは 1 です。
- `max` (数値): 範囲の最大値（含む）。デフォルトは 10 です。

### 戻り値:

- (number): 指定された範囲内のランダムな整数。

### 例：

```typescript
const randomNum = getRandomInt(5, 20)
console.log(randomNum) // 5から20までのランダムな整数（両端含む）
```

### 実装:

```typescript
export const getRandomInt = (min: number = 1, max: number = 10): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
```

# 時間

## `sleep` 関数

### 説明:

指定したミリ秒数だけスリープします。

### パラメータ:

- `ms` (数値): スリープするミリ秒数。

### 戻り値:

- (Promise<void>): 指定した時間後に解決するプロミス。

### 例：

```typescript
async function main() {
  console.log('開始')
  await sleep(2000) // 2秒間スリープ
  console.log('終了') // スリープ後に表示
}
main()
```

## `utcNow` 関数

### 説明:

現在の UTC 時間を返します。

### 戻り値:

- (Date): 現在の UTC 時間。

### 例：

```typescript
const now = utcNow()
console.log(now) // 現在のUTC時間
```

# 暗号化

# モジュール: crypto

crypto モジュールのデフォルト値。

```ts
export const algorithm = 'aes-256-cbc'
export const inputEncoding = 'utf8'
export const outputEncoding = 'base64'
```

## `encrypt` 関数

### 説明：

指定されたパラメータを使用してデータを暗号化します。

### パラメータ:

- `data` (string): 暗号化するデータ。
- `iv` (string): 初期化ベクトル。
- `password` (string): 暗号化のためのパスワード。
- `salt` (string): 鍵導出のためのソルト。

### 戻り値:

- (string): 暗号化されたデータ。

### 例：

```typescript
const data = '機密情報'
const iv = '1234567890123456' // 16文字
const password = '私の秘密のパスワード'
const salt = '私の塩'
const encrypted = encrypt(data, iv, password, salt)
console.log(encrypted)
```

### 実装:

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

## `decrypt` 関数

### 説明:

与えられたパラメータを使用してデータを復号化します。

### パラメータ:

- `encryptedData` (string): 暗号化されたデータ。
- `iv` (string): 初期化ベクトル。
- `password` (string): 復号化のためのパスワード。
- `salt` (string): 鍵導出のためのソルト。

### 戻り値:

- (string): 復号化されたデータ。

### 例：

```typescript
const encrypted = 'EncryptedDataHere' // 暗号化プロセスから取得した暗号化データ
const iv = '1234567890123456' // 暗号化プロセスで使用された初期化ベクトル
const password = 'MySecretPassword' // 暗号化プロセスで使用されたパスワード
const salt = 'MySalt' // 暗号化プロセスで使用されたソルト
const decrypted = decrypt(encrypted, iv, password, salt)
console.log(decrypted)
```

### 実装:

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

## `generateIv` 関数

### 説明:

暗号化のためのランダムな初期化ベクトル（IV）を生成します。

### 戻り値:

- (string): base64 エンコードされた文字列として生成された初期化ベクトル。

### 例：

```typescript
const iv = generateIv()
console.log(iv) // ランダムな base64 エンコードされた初期化ベクトル
```

### 実装:

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

## `generateRandomSalt` 関数

### 説明:

キー導出のためのランダムなソルトを生成します。

### パラメータ:

- `bytes` (数値): 生成されるソルトのバイト数。デフォルトは 16 バイトです。

### 戻り値:

- (string): 生成されたソルトを 16 進数の文字列として返します。

### 例：

```typescript
const salt = generateRandomSalt()
console.log(salt) // ランダムな16進数のソルト
```

### 実装:

```typescript
export function generateRandomSalt(bytes = 16): string {
  try {
    return randomBytes(bytes).toString('hex')
  } catch (error) {
    throw new Error(`generateRandomSalt: ${error}`)
  }
}
```

## `gravatarIconUrl` 関数

### 説明：

指定されたメールアドレスの Gravatar アイコン URL を生成します。

### パラメータ:

- `email` (文字列): Gravatar アイコンの URL を生成するためのメールアドレス。

### 戻り値:

- (string): Gravatar アイコンの URL。

### 例：

```typescript
const email = 'user@example.com'
const gravatarUrl = gravatarIconUrl(email)
console.log(gravatarUrl) // Gravatar アイコンの URL
```

### 実装:

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

## `encodeBase64` 関数

### 説明:

ペイロードを base64 にエンコードします。

### パラメータ:

- `payload` (string): エンコードされるデータ。

### 戻り値:

- (string): base64 でエンコードされたペイロード。

### 例：

```typescript
const data = 'Hello, world!'
const encodedData = encodeBase64(data)
console.log(encodedData) // Base64でエンコードされたデータ
```

### 実装:

```typescript
export const encodeBase64 = (payload: string): string => {
  return Buffer.from(payload).toString('base64')
}
```

---

## `decodeBase64` 関数

### 説明：

base64 でエンコードされたペイロードを文字列にデコードします。

### パラメータ:

- `payload` (string): デコードするための base64 エンコードされたデータ。

### 戻り値:

- (string): UTF-8 文字列としてデコードされたペイロード。

### 例：

```typescript
const encodedData = 'SGVsbG8sIHdvcmxkIQ==' // Base64でエンコードされたデータ
const decodedData = decodeBase64(encodedData)
console.log(decodedData) // デコードされたデータ: "Hello, world!"
```

### 実装:

```typescript
export const decodeBase64 = (payload: string): string => {
  return Buffer.from(payload, 'base64').toString('utf-8')
}
```
