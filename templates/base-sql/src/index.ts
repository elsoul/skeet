import { serve } from '@hono/node-server'
import { Hono, Context } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from '@/routes/user'
import dotenv from 'dotenv'
import packageJson from '../package.json'
dotenv.config()

const app = new Hono()
// Allowed Origins
const allowedOrigins: string[] = []
if (process.env.NODE_ENV === 'production') {
  allowedOrigins.push('https://app.epics.dev')
  allowedOrigins.push('https://lb.epics.dev')
} else {
  allowedOrigins.push('http://localhost:3000')
  allowedOrigins.push('http://localhost:4200')
  for (let i = 0; i < 10; i++) {
    allowedOrigins.push(`http://localhost:1900${i}`)
  }
}

// CORS Options
app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return origin
      } else {
        return null
      }
    },
  }),
)

const rootDir = '/card-db'

app.route(rootDir + '/users', userRouter)

app.get(rootDir + '/', (c: Context) => {
  return c.json({ message: 'Hello, World!' })
})

const port = Number(process.env.PORT) || packageJson.port
console.log(`Server is running on port http://localhost:${port}${rootDir}/`)
serve({
  fetch: app.fetch,
  port,
})
