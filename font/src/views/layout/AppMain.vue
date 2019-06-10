<template>
	<section class="app-main" style="min-height: 100%">
    <levelbar></levelbar>
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
import Levelbar from './Levelbar'
export default {
  name: 'AppMain',
  components: {
    Levelbar
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>
<style lang="scss">
  .page-wrap{
    padding: 0 20px;
    .page-body{
      > div {
        background-color: #fff;
        padding: 20px;
      }
    }
  }
</style>