import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const post = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  author: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).defaultNow(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).defaultNow(),
})
