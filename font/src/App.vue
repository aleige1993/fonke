<template>
  <div id="app" v-loading="loading">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
  name: 'app',
  data () {
  	return {
  		loading: true
  	}
  },
  mounted () {
  	this.$nextTick(function () {
  		this.loading = false
      let loading = document.querySelector('.app-loading')
      loading.classList.add('hidden')
      setTimeout(() => {
        loading.style.display = 'none'
      }, 1200)
  	})
  }
}
</script>

<style>
#app {
}
</style>
