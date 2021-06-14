<template>
  <main class="main-bg">
    <div class="d-flex full-page">
      <div class="bg-dark side-nav text-white text-center">
        <router-link :to="{name: 'Home'}" title="Home">
          <img src="./assets/img/hive.png" alt="home" height="100" width="100" class="m-4 home-icon">
        </router-link>
        <button class="btn btn-primary" v-if="!user.isAuthenticated" @click="login">
          Login
        </button>
        <button class="btn btn-warning" v-if="user.isAuthenticated" @click="logout">
          Logout
        </button>
        <router-link :to="{name:'Account'}" title="Account" v-if="user.isAuthenticated">
          <p>Edit Account Info</p>
        </router-link>
        <div @click="getProfile" v-if="user.isAuthenticated">
          <router-link :to="{name:'Profile', params:{id: account.id}}" title="Profile">
            <p>Profile</p>
          </router-link>
        </div>
      </div>
    </div>
    <router-view />
    <div class="d-flex full-page add-space container border flex-column bg-dark align-items-center">
      <Advert v-for="advert in adverts" :key="advert.id" :advert="advert" />
    </div>
  </main>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from './AppState'
import { AuthService } from './services/AuthService'
import { profilesService } from './services/ProfilesService'

export default {
  name: 'App',
  setup() {
    const state = reactive({
      dropOpen: false
    })
    return {
      state,
      appState: computed(() => AppState),
      user: computed(() => AppState.user),
      adverts: computed(() => AppState.adverts),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      },
      async getProfile() {
        profilesService.getProfile(this.account.id)
      }
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.full-page{
  min-height: 100vh;
}
.side-nav{
  max-width: 146px;
}
.add-space{
  max-width: 300px;
}
.main-bg{
  background-image: url('./assets/img/honeycomb.jpg');
}
</style>
