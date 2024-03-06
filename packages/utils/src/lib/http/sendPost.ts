import fetch from 'node-fetch'
import { Response as NodeFetchResponse } from 'node-fetch'

/**
 * Sends a POST request to a specified URL with a given body, optional Bearer Token, and optional custom headers.
 * The 'Content-Type' header is set to 'application/json' by default, but can be overridden by the headers parameter.
 * This function attempts to parse the response as JSON if the response's Content-Type header indicates 'application/json'.
 * If the response's Content-Type is not 'application/json', an error is thrown. This ensures the response data is of the expected type U.
 *
 * @template T - The type of the request body.
 * @template U - The expected type of the response data. The function attempts to return the response as this type if it's JSON.
 *
 * @param url - The URL to send the POST request to.
 * @param body - The body of the POST request, expected to be of type T. It will be stringified to JSON.
 * @param token - Optional Bearer token to be included in the Authorization header.
 * @param headers - Optional headers to be included in the request. Can override the default 'Content-Type' and provide additional headers.
 *
 * @returns A Promise that resolves to the response data of type U if the response is JSON.
 *
 * @example
 * ```typescript
 * // Example with default Content-Type and Authorization token, expecting a JSON response
 * async function createUser() {
 *   try {
 *     const userData = await sendPost<{ name: string }, { id: number, name: string }>(
 *       'https://api.example.com/users',
 *       { name: 'Alice' },
 *       'mytoken123'
 *     );
 *     console.log(userData); // userData is of type { id: number, name: string }
 *   } catch (error) {
 *     console.error("Error creating user:", error);
 *   }
 * }
 *
 * // Example with custom headers, expecting a JSON response
 * async function updateUser() {
 *   try {
 *     const customHeaders = {
 *       'Content-Type': 'application/x-www-form-urlencoded',
 *       'Custom-Header': 'value'
 *     };
 *     const response = await sendPost<{ name: string, age: number }, { success: boolean }>(
 *       'https://api.example.com/users/update',
 *       { name: 'Bob', age: 30 },
 *       'mytoken123',
 *       customHeaders
 *     );
 *     console.log(response); // response is expected to be of type { success: boolean }
 *   } catch (error) {
 *     console.error("Error updating user:", error);
 *   }
 * }
 * ```
 *
 * @throws Will throw an error if the POST request fails or if the response is not in JSON format when expected.
 */
export const sendPost = async <T, U = any>(
  url: string,
  body: T,
  token?: string,
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
) => {
  try {
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const response = (await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })) as NodeFetchResponse

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const jsonData = await response.json()
      return jsonData as U
    } else {
      throw new Error(`response is not JSON: ${response}`)
    }
  } catch (e) {
    console.error(e)
    throw new Error(`sendPost failed: ${JSON.stringify(body)}`)
  }
}
