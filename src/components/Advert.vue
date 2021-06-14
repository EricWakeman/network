<template>
  <div class="row">
    <div class="col-12">
      <img :src="advert.tall" :alt="advert.id" class="mt-5 rounded shadow" height="350" width="200">
    </div>
  </div>
</template>

<script>
export default {
  props: { advert: { type: Object, required: true } },
  setup() {
    return {

    }
  }
}
</script>

<style>

</style>
