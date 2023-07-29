import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
dotenv.config()

export type QueryType = 'query' | 'mutation'
export type GraphQLResponse<T> = {
  data: {
    [key: string]: T
  }
}

const ACCESS_TOKEN = process.env.ACCESS_TOKEN || ''

export const sendGraphqlRequest = async <
  T extends Record<string, any>,
  R extends Record<string, any>
>(
  queryType: QueryType,
  queryName: string,
  params: T,
  returnParams = ['id'],
  baseUrl = 'http://localhost:3000/graphql'
) => {
  const body = graphqlString(queryType, queryName, params, returnParams)
  try {
    const res = await fetch(baseUrl, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
    const result = (await res.json()) as GraphQLResponse<R>
    console.log(`graphql body: ${body}`)
    return result
  } catch (error) {
    console.log(`graphql body: ${body}`)
    throw new Error(`sendGraphqlRequest failed: ${error}`)
  }
}
const escapeGraphQLString = (str: string): string => {
  return str
    .replace(/\\`/g, '`') // replace \` with `
    .replace(/\\/g, '\\\\') // replace \ with \\
    .replace(/"/g, '\\"') // replace " with \"
    .replace(/\n/g, '\\n') // replace newline with \n
}

export const graphqlString = <T extends Record<string, any>>(
  queryType: QueryType,
  queryName: string,
  params: T,
  outputString = ['id']
) => {
  try {
    const inputString = Object.entries(params)
      .map(([key, value]) => {
        if (value === undefined || value === null) {
          return `${key}: ""`
        } else if (typeof value === 'number' || typeof value === 'boolean') {
          return `${key}: ${value}`
        } else {
          // Escape special characters in the string
          const escapedValue = escapeGraphQLString(value)
          return `${key}: \"${escapedValue}\"`
        }
      })
      .join(', ')

    const returnParams = outputString.join(' ')

    const graphql = JSON.stringify({
      query: `${queryType} { ${queryName}(${inputString}) { ${returnParams} } }`,
      variables: {},
    })
    return graphql
  } catch (error) {
    throw new Error(`graphqlString failed: ${error}`)
  }
}
