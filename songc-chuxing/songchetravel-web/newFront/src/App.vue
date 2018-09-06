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
  created () {
    const self = this
    self.mobileFun()
    window.onresize = function () {
      self.mobileFun()
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
  },
  methods: {
    mobileFun () {
      const self = this
      let is_mobile = false
      if (document.documentElement.clientWidth < 768) {
        is_mobile = true
      }
      self.$store.dispatch('setMobile', is_mobile)
    }
  }
}
</script>

<style>
#app {
}
</style>
