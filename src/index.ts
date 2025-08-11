import 'dotenv/config'
import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

import { post } from './post'

const app = new Elysia({ aot: true })
  .use(swagger())
  .use(cors())
  .use(post)
  .get('/', () => 'Hello Elysia')
  .listen(8080)

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
)

export type App = typeof app
