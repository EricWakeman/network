<template>
  <div class="row py-4">
    <div class="col-12">
      <div class="card shadow rounded">
        <div class="card-header" @click="getProfile">
          <img :src="post.imgUrl" alt="Post Image" height="500" width="500" v-if="post.imgUrl">
        </div>
        <div class="card-body">
          <router-link :to="{name:'Profile', params:{id: post.creatorId} }" title="Home">
            <img :src="post.creatorImg" :alt="post.creatorId" height="100" width="100">
          </router-link>
          <h4>Posted: {{ time[0] }}</h4>
          <span>{{ post.body }}</span>
        </div>
        <div class="card-footer text-right">
          <button class="btn btn-success" @click="unlikePost" v-if="user.isAuthenticated && post.likeIds.includes(account.id)">
            LIKED: {{ post.likeIds.length }}
          </button>
          <button class="btn btn-primary" @click="likePost" v-else-if="user.isAuthenticated">
            Likes: {{ post.likeIds.length }}
          </button>
          <button class="btn btn-danger" @click="deletePost" v-if="post.creatorId == account.id">
            Delete Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { profilesService } from '../services/ProfilesService'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Notification from '../utils/Notification'
import moment from 'moment'
export default {
  props: { post: { type: Object, required: true } },
  setup(props) {
    const time = props.post.createdAt.split('T')
    const noZ = time[1].replace('Z', '')
    const convert = moment(time[0]).format()
    return {
      noZ,
      time,
      convert,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      async getProfile() {
        await profilesService.getProfile(props.post.creatorId)
      },
      async deletePost() {
        if (await Notification.confirmAction('Are you sure you wish to delete?')) {
          postsService.deletePost(props.post.id)
        }
      },
      likePost() {
        postsService.likePost(props.post.id)
      },
      unlikePost() {
        postsService.unlikePost(props.post.id)
      }
    }
  }
}
</script>

<style>

</style>
