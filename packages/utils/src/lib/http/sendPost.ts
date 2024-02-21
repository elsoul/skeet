import fetch from 'node-fetch'
import { Response as NodeFetchResponse } from 'node-fetch'

/**
 * Sends a POST request to a specified URL with a given body, optional Bearer Token, and optional custom headers.
 * The 'Content-Type' header is set to 'application/json' by default, but can be overridden by the headers parameter.
 *
 * @template T - The type of the request body.
 *
 * @param url - The URL to send the POST request to.
 * @param body - The body of the POST request.
 * @param token - Optional token to be included in the Authorization header.
 * @param headers - Optional headers to be included in the request. Can override the default 'Content-Type' and provide additional headers.
 *
 * @returns The response from the POST request.
 *
 * @example
 * ```typescript
 * // Example with default Content-Type and Authorization token
 * const response = await sendPost<{ name: string }>(
 *   'https://api.example.com/users',
 *   { name: 'Alice' },
 *   'mytoken123'
 * );
 * const data = await response.json();
 * console.log(data);
 *
 * // Example with custom headers
 * const customHeaders = {
 *   'Content-Type': 'application/x-www-form-urlencoded',
 *   'Custom-Header': 'value'
 * };
 * const responseWithCustomHeaders = await sendPost<{ name: string, age: number }>(
 *   'https://api.example.com/users',
 *   { name: 'Bob', age: 30 },
 *   'mytoken123',
 *   customHeaders
 * );
 * const dataWithCustomHeaders = await responseWithCustomHeaders.json();
 * console.log(dataWithCustomHeaders);
 * ```
 *
 * @throws Will throw an error if the POST request fails, including the failed request body.
 */
export const sendPost = async <T>(
  url: string,
  body: T,
  token?: string,
  headers?: any,
): Promise<NodeFetchResponse> => {
  try {
    if (!headers) {
      headers = { 'Content-Type': 'application/json' }
    }
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
