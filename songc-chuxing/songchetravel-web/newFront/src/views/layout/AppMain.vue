<template>
	<section class="app-main" style="min-height: 100%">
    <div class="page-wrap">
      <div class="page-body">
        <transition name="fade" mode="out-in">
          <router-view :key="key"></router-view>
        </transition>
      </div>
    </div>
	</section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>
<style lang="scss">
  .app-main {
    display: block;
  }
  .page-wrap{
    min-height: 100%;
    .page-body {
      overflow-y: auto;
      overflow-x: hidden;
      width: 100%;
      min-height: 100%;
    }
  }
</style>