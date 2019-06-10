<template>
    <el-menu mode="vertical" class="sideBar" unique-opened :default-active="$route.path" :collapse="isCollapse">
      <h1 class="main-logo" @click="backHome">
        <img class="logo-img" :src="logo" v-if="!isCollapse" />
        <img class="logo-img" :src="logo2" v-if="isCollapse" />
      </h1>
      <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
</template>


<script>
  import { mapGetters } from 'vuex';
  import SidebarItem from './SidebarItem';
  export default {
    data () {
      return {
        logo: require('assets/logo-white.png'),
        logo2: require('assets/logo-min.png')
      }
    },
    components: { SidebarItem },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    methods: {
      backHome () {
        // console.log(this.$router.go)
        this.$router.push({ name: '首页' });
      }
    }
  }
</script>

<style lang="scss">
  @import "../../styles/color";
  .sideBar{
    background-color: #333645 !important;
  }
  .sidebar-container.el-menu--collapse{
    .main-logo{
      .logo-img{
        top:15px !important;
      }
    }

  }
  .app-wrapper.hideSidebar .sidebar-container {
    width: 64px !important;
    .sideBarIcon{
      margin-right: 0;
      margin-left: 8px;
      font-size: 20px;
    }
  }
  .main-logo {
    height: 60px;
    background-color: $white;
    text-align: center;
    padding: 4px 0;
    overflow: hidden;
    .logo-img{
      position: relative;
      top: -15px;
    }
    font-size: 12px;
    color: #666;
    font-weight: normal;
    margin-bottom: 20px;
  }
</style>
