<template>
  <div class="container">
    <Profile v-if="profile" />
    <Thread />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
import { profilesService } from '../services/ProfilesService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await profilesService.getProfile(route.params.id)
        await postsService.getPostsById()
      } catch (error) {
        Notification.toast(error, 'error')
        logger.log(error)
      }
    })
    return {
      route,
      profile: computed(() => AppState.profile)
    }
  }

}
</script>

<style>

</style>
