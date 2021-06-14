import axios from 'axios'
import { AppState } from '../AppState'
import Post from '../models/Post'

const { logger } = require('../utils/Logger')
const { api } = require('./AxiosService')

class PostsService {
  async getPosts() {
    const res = await api.get('/api/posts')
    logger.log(res.data)
    AppState.posts = res.data.posts.map((m) => new Post(m))
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
  }

  async getPostsById() {
    const res = await api.get('/api/profiles/' + AppState.profile.id + '/posts')
    logger.log(res.data)
    AppState.posts = res.data.posts.map((m) => new Post(m))
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
  }

  async addPost(newPost) {
    const res = await api.post('/api/posts', newPost)
    logger.log(res.data)
    AppState.posts = [new Post(res.data), ...AppState.posts]
  }

  async deletePost(id) {
    const res = await api.delete('api/posts/' + id)
    AppState.posts = AppState.posts.filter(p => p.id !== res.data.id)
  }

  async likePost(id) {
    const res = await api.post('api/posts/' + id + '/like')
    const post = AppState.posts.find(p => p.id === id)
    logger.log(res.data)
    post.likeIds.push(AppState.account.id)
    logger.log(post.likeIds)
  }

  async unlikePost(id) {
    const res = await api.post('api/posts/' + id + '/like')
    const post = AppState.posts.find(p => p.id === id)
    logger.log(res.data)
    post.likeIds.filter(p => p.id !== AppState.account.id)
    logger.log(post.likeIds)
  }

  async getNewerPosts() {
    const res = await axios.get(AppState.newerPosts)
    AppState.posts = res.data.posts.map((p) => new Post(p))
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
  }

  async getOlderPosts() {
    const res = await axios.get(AppState.olderPosts)
    AppState.posts = res.data.posts.map((p) => new Post(p))
    AppState.newerPosts = res.data.newer
    AppState.olderPosts = res.data.older
  }

  async getPostsByQuery(query) {
    const res = await api.get('/api/posts?query=' + query)
    logger.log(res.data)
    AppState.posts = res.data.posts.map((p) => new Post(p))
  }
}

export const postsService = new PostsService()
