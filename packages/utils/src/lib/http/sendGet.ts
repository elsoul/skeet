import fetch from 'node-fetch'
import { Response as NodeFetchResponse } from 'node-fetch'

/**
 * Sends a GET request to a specified URL with optional query parameters, optional Bearer Token, and optional custom headers.
 * The 'Content-Type' header is set to 'application/json' by default, but can be overridden or supplemented by the headers parameter.
 *
 * @param url - The URL to send the GET request to.
 * @param params - Optional query parameters to be appended to the URL.
 * @param token - Optional token to be included in the Authorization header.
 * @param headers - Optional headers to be included in the request. Can override the default 'Content-Type' and provide additional headers.
 *
 * @returns The response from the GET request.
 *
 * @example
 * ```typescript
 * // Example with default Content-Type and Authorization token
 * const response = await sendGet(
 *   'https://api.example.com/data',
 *   { q: 'searchTerm' },
 *   'mytoken123'
 * );
 * const data = await response.json();
 * console.log(data);
 *
 * // Example with custom headers
 * const customHeaders = {
 *   'Custom-Header': 'value',
 *   'Another-Header': 'anotherValue'
 * };
 * const responseWithCustomHeaders = await sendGet(
 *   'https://api.example.com/data',
 *   { q: 'searchTerm' },
 *   'mytoken123',
 *   customHeaders
 * );
 * const dataWithCustomHeaders = await responseWithCustomHeaders.json();
 * console.log(dataWithCustomHeaders);
 * ```
 *
 * @throws Will throw an error if the GET request fails.
 */

export const sendGet = async (
  url: string,
  params?: any,
  token?: string,
  headers?: any,
): Promise<NodeFetchResponse> => {
  try {
    if (!headers) {
      headers = { 'Content-Type': 'application/json' }
    }
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
