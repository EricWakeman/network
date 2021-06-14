<template>
  <div class="row justify-content-center pt-4">
    <div class="col-8">
      <Post v-for="post in posts" :key="post.creatorID" :post="post" />
    </div>
  </div>
  <div class="row justify-content-center">
    <button class="btn btn-primary mx-1" @click="getNewerPosts" v-if="newerPosts">
      Previous
    </button>
    <button class="btn btn-primary mx-1" @click="getOlderPosts" v-if="olderPosts">
      Next
    </button>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
export default {
  setup() {
    return {
      posts: computed(() => AppState.posts),
      newerPosts: computed(() => AppState.newerPosts),
      olderPosts: computed(() => AppState.olderPosts),

      getNewerPosts() {
        postsService.getNewerPosts()
      },
      getOlderPosts() {
        postsService.getOlderPosts()
      }
    }
  }
}
</script>

<style>

</style>
