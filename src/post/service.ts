import { status } from 'elysia'
import { desc, eq } from 'drizzle-orm'
import { db } from '../database'
import { post } from '../database/schema'
import { PostModel } from './model'

export abstract class PostService {
  static async getAllPosts() {
    return db.select().from(post).orderBy(desc(post.createdAt))
  }

  static async getPostById(id: number) {
    const item = await db
      .select()
      .from(post)
      .where(eq(post.id, id))
      .then((result) => result[0])
    if (!item) {
      return status(404, { error: 'Post not found' })
    }
    return item
  }

  static async createPost(body: PostModel.upsertPost) {
    return (
      db
        .insert(post)
        // Mock value for author for now
        .values(body)
        .returning()
        .then((result) => result[0])
    )
  }

  static async updatePost(id: number, body: PostModel.upsertPost) {
    const item = await db
      .update(post)
      .set(body)
      .where(eq(post.id, id))
      .returning()
      .then((result) => result[0])
    if (!item) {
      return status(404, { error: 'Post not found' })
    }
    return item
  }

  static async deletePost(id: number) {
    const deleted = await db
      .delete(post)
      .where(eq(post.id, id))
      .returning({ id: post.id })
      .then((result) => result[0])
    if (!deleted) {
      return status(404, { error: 'Post not found' })
    }
    return { message: 'Post deleted successfully', id: deleted.id }
  }
}
