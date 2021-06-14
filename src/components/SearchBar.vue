<template>
  <form @submit.prevent="getPostsByQuery" class="mt-2">
    <label for="Search Posts">
      <input type="text" class="form-control" placeholder="Search Posts" v-model="state.searchQuery.param">
    </label>
    <button class="btn btn-primary" type="submit">
      Search
    </button>
  </form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
export default {
  setup() {
    const state = reactive({
      searchQuery: {}
    })
    return {
      state,
      getPostsByQuery() {
        postsService.getPostsByQuery(state.searchQuery.param)
      }
    }
  }
}
</script>

<style>

</style>
