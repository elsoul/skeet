import fetch from 'node-fetch'

/**
 * Sends a GET request to a specified URL with optional query parameters, optional Bearer Token, and optional custom headers.
 * The 'Content-Type' header is set to 'application/json' by default, but can be overridden or supplemented by the provided headers parameter.
 * This function returns the response data as a JSON object of type U if the request is successful.
 * If the response status is an unsuccessful request or a faulty response), an error is thrown with relevant information.
 *
 * @template T - The type of the query parameters.
 * @template U - The expected type of the response data.
 *
 * @param url - The URL to send the GET request to.
 * @param params - Optional query parameters to be appended to the URL. Must match the structure defined by type T.
 * @param token - Optional token to be included in the Authorization header as a Bearer token.
 * @param headers - Optional headers to be included in the request. Allows overriding the default 'Content-Type' header and providing additional headers. Should be an object with keys and values representing header names and their values.
 *
 * @returns A Promise that resolves to the JSON-parsed response body of the GET request of type U.
 *
 * @example
 * ```typescript
 * // e.g. Get UserResponse data
 * // Query Parameters
 * interface QueryParams {
 *  userId: string
 * }
 *
 * // Response
 * interface UserResponse {
 *  id: number
 *  name: string
 *  email: string
 * }
 *
 * async function fetchUserData() {
 *   const url = 'https://api.example.com/user';
 *   const queryParams: QueryParams = { userId: '123' };
 *   try {
 *     const userData = await sendGet<QueryParams, UserResponse>(
 *       url,
 *       queryParams,
 *       'mytoken123'
 *     );
 *     console.log(userData); // { id: 123, name: 'Kawasaki', email: 'test@example.com' }
 *   } catch (error) {
 *     console.error("Failed to fetch user data:", error);
 *   }
 * }
 * ```
 *
 * @throws Will throw an error if the GET request fails or if the response status is not a valid number, indicating a failure or a faulty response.
 */

export const sendGet = async <T = Record<string, never>, U = any>(
  url: string,
  params?: T,
  token?: string,
  headers: Record<string, string> = { 'Content-Type': 'application/json' },
): Promise<U> => {
  try {
    let urlWithParams = url
    if (params && Object.keys(params).length > 0) {
      // params are present, so append them to the URL
      const queryParams = new URLSearchParams(params as any).toString()
      urlWithParams += `?${queryParams}`
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const res = await fetch(urlWithParams, {
      method: 'GET',
      headers,
    })

    // Content-Type ヘッダーを確認してJSONとしてパースするか判断
    const contentType = res.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      // レスポンスがJSONであれば、U型としてパース
      const jsonData = await res.json()
      return jsonData as U
    } else {
      throw new Error('Response is not JSON')
    }
  } catch (e) {
    console.error(e)
    throw new Error('sendGET failed')
  }
}
