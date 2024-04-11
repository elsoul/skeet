import { v2beta3 } from '@google-cloud/tasks'
import { Buffer } from 'buffer'
import { GoogleAuth } from 'google-auth-library'

const { CloudTasksClient } = v2beta3

/**
 * Creates and schedules an HTTP task to a specified endpoint with a service account token.
 *
 * @param {string} project - The project ID.
 * @param {string} location - The location of the task.
 * @param {string} queue - The name of the task queue.
 * @param {string} endpoint - The endpoint URL for the task.
 * @param {Record<string, any>} body - The body of the HTTP request.
 * @param {string} serviceAccountEmail - The service account email to use for the task.
 * @param {string} cloudRunUrl - The Cloud Run URL to access the service.
 * @param {number} [inSeconds] - The schedule time for the task in seconds from now.
 * @returns {Promise<boolean>} - Indicates success or failure of task creation.
 * @throws {Error} - Throws an error if there is an issue creating the task.
 *
 * @example
 * ```
 * const project = 'your-project-id'
 * const location = 'your-location'
 * const queue = 'your-queue'
 * const endpoint = 'https://your.endpoint.url'
 * const body = { key: 'value' }
 * const serviceAccountEmail = 'client@<project-id>.iam.gserviceaccount.com'
 * const cloudRunUrl = 'https://your-cloud-run-endpoint'
 * const inSeconds = 60 // 1 minute from now
 *
 * const result await = createTaskWithToken(project, location, queue, endpoint, body, serviceAccountEmail, cloudRunUrl, inSeconds)
 * console.log(result)
 * ```
 */

export async function createTaskWithToken(
  project: string,
  location: string,
  queue: string,
  endpoint: string,
  body: Record<string, any>,
  serviceAccountEmail: string,
  cloudRunUrl: string,
  inSeconds?: number,
): Promise<boolean> {
  try {
    const auth = new GoogleAuth()
    const tokenClient = await auth.getIdTokenClient(cloudRunUrl)
    const token = await tokenClient.idTokenProvider.fetchIdToken(cloudRunUrl)
    const client = new CloudTasksClient()
    const parent = client.queuePath(project, location, queue)
    const task = {
      httpRequest: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        httpMethod: 'POST',
        oidcToken: {
          serviceAccountEmail,
        },
        url: endpoint,
        body: Buffer.from(JSON.stringify(body)).toString('base64'),
      },
      scheduleTime: {},
    }

    if (inSeconds) {
      task.scheduleTime = {
        seconds: Math.floor(Date.now() / 1000) + inSeconds,
      }
    }
    console.log(`Sending task: ${queue}`)

    const request = { parent, task }
    //@ts-ignore
    const [response] = await client.createTask(request)
    const name = response.name
    console.log(`Created task ${name}`)
    return true
  } catch (error) {
    console.error(`Error in createTaskWithToken: ${error}`)
    return false
  }
}
