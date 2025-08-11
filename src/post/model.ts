import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'
import { t } from 'elysia'
import { post } from '../database/schema'

const _upsertPost = createInsertSchema(post)

export namespace PostModel {
  export const upsertPost = t.Pick(_upsertPost, ['content'])
  export type upsertPost = typeof upsertPost.static

  export const postResponse = createSelectSchema(post)
  export type postResponse = typeof postResponse.static

  export const errorResponse = t.Object({
    error: t.String(),
  })
  export type errorResponse = typeof errorResponse.static

  export const deleteResponse = t.Object({
    message: t.String(),
    id: t.Integer(),
  })
  export type deleteResponse = typeof deleteResponse.static
}
