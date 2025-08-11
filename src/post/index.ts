import Elysia, { t } from 'elysia'
import { PostService } from './service'
import { PostModel } from './model'

const idParams = t.Object({
  id: t.Integer(),
})

export const post = new Elysia({ prefix: '/posts' })
  .get('/', PostService.getAllPosts)
  .get('/:id', ({ params }) => PostService.getPostById(params.id), {
    params: idParams,
    response: {
      200: PostModel.postResponse,
      404: PostModel.errorResponse,
    },
  })
  .post('/', ({ body }) => PostService.createPost(body), {
    body: PostModel.upsertPost,
    response: PostModel.postResponse,
  })
  .put('/:id', ({ params, body }) => PostService.updatePost(params.id, body), {
    body: PostModel.upsertPost,
    response: {
      200: PostModel.postResponse,
      404: PostModel.errorResponse,
    },
    params: idParams,
  })
  .delete('/:id', ({ params }) => PostService.deletePost(params.id), {
    params: idParams,
    response: {
      200: PostModel.deleteResponse,
      404: PostModel.errorResponse,
    },
  })
