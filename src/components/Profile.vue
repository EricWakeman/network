<template>
  <div class="row justify-content-center my-4">
    <div class="col-6">
      <div class="card shadow p-2">
        <form @submit.prevent="addPost" v-if="account.id === $route.params.id" class="m-auto">
          <div>
            <label for="Post Body">
              <input class="form-control form-control-lg" type="text" placeholder="What's on your mind?" v-model="state.newPost.body" required>
            </label>
          </div>
          <div>
            <label for="Post Img Url">
              <input class="form-control form-control-sm" type="text" placeholder="Image URL" v-model="state.newPost.imgUrl">
            </label>
          </div>
          <button class="btn btn-primary" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="card shadow rounded">
      <div class="card-header">
        <img :src="profile.picture" :alt="profile.id" height="460" width="460">
      </div>
      <div class="card-body">
        <ul>
          <p>Bio: {{ profile.bio }}</p>
          <p>Class: {{ profile.class }}</p>
          <p>Email: {{ profile.email }}</p>
          <p>GitHub: {{ profile.github }}</p>
          <p>LinkedIn: {{ profile.linkdein }}</p>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
export default {
  setup() {
    const state = reactive({
      newPost: {
        creatorId: AppState.account.id
      }
    })
    return {
      state,
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      addPost() {
        postsService.addPost(state.newPost)
      }
    }
  }

}
</script>

<style>

</style>
