<template>
  <div class="col-6 card shadow  text-center p-2">
    <form @submit.prevent="editAccount" class="mx-3">
      <div>
        <label for="Bio">
          <input type="text" class="form-control form-control-lg" placeholder="Personal Bio" v-model="state.accountInfo.bio" width="500">
        </label>
      </div>
      <div>
        <label for="Class">
          <input type="text" class="form-control" placeholder="What Codeworks Class are/were you in?" v-model="state.accountInfo.class">
        </label>
      </div>
      <div>
        <label for="github">
          <input type="text" class="form-control" placeholder="Github Url" v-model="state.accountInfo.github">
        </label>
      </div>
      <div>
        <label for="picture">
          <input type="text" class="form-control" placeholder="Picture Url" v-model="state.accountInfo.picture">
        </label>
      </div>
      <button class="btn btn-primary">
        Submit Changes
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
export default {
  setup() {
    const state = reactive({
      accountInfo: {
        id: AppState.account.id
      }
    })
    return {
      state,
      editAccount() {
        accountService.editAccount(state.accountInfo)
      }

    }
  }

}
</script>

<style>

</style>
