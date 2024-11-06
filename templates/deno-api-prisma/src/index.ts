import { Hono } from '@hono/hono'
import * as Prisma from '@PrismaSkeetClient'
import type { PrismaClient } from '@cmn/prisma/skeet/PrismaSkeetClient/index.d.ts'
import loadEnv from '@/lib/loadEnv.ts'

const port = Number(Deno.env.get('PORT')) || 9000
const {
  DATABASE_URL,
} = loadEnv()

export type CustomContext = {
  prisma: PrismaClient
}

const app = new Hono<{
  Variables: CustomContext
}>()

app.use('*', async (c, next) => {
  const prisma = new Prisma.PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  })
  c.set('prisma', prisma)
  await next()
  await prisma.$disconnect()
})

const rootDir = '/v1'
app.post(rootDir + '/user', async (c) => {
  const prisma = c.get('prisma')
  const user = await prisma.user.create({
    data: await c.req.json(),
  })
  return c.json(user)
})

Deno.serve({ port }, app.fetch)
