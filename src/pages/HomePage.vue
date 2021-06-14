<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <SearchBar />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-6 text-center">
        <h2>Welcome to the Hive</h2>
      </div>
    </div>
    <Thread />
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import Notification from '../utils/Notification'
import { postsService } from '../services/PostsService'
import { logger } from '../utils/Logger'
import { profilesService } from '../services/ProfilesService'
import { advertsService } from '../services/AdvertsService'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await advertsService.getAdverts()
        await postsService.getPosts()
        await profilesService.clearProfile()
      } catch (error) {
        Notification.toast(error, 'error')
        logger.error(error)
      }
    })
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
