<template>
    <el-menu mode="vertical" class="sideBar" :class="{ isMin: !sidebar.opened }" unique-opened :default-active="$route.path">
      <h1 class="main-logo">
        <img class="logo-img" :src="logo" v-if="!isCollapse && !isMobile" />
        <img class="logo-img" :src="logo2" v-if="isCollapse && !isMobile" />
        <img class="logo-img" :src="logo" v-if="isMobile">
        <i v-if="isMobile" @click="close" class="iconfont menu-colse-btn">&#xe600;</i>
      </h1>
      <sidebar-item class="menu-wrap" :routes='permission_routers'></sidebar-item>
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
        'sidebar',
        'isMobile'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    methods: {
			close() {
				this.$store.dispatch('ToggleSideBar')
      },
		}
  }
</script>

<style lang="scss">
  @import '../../styles/color.scss';
  .sideBar{
    background-color: #fff;
    padding-bottom: 40px;
  }
  .menu-wrap{
    padding: 0 10px;
    height: calc(100% - 50px);
    overflow: auto;
  }
  .el-menu--collapse{
    .main-logo{
      text-align: center;
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
    background-color: #4877E8;
    overflow: hidden;
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
    .logo-img{
      height: 26px;
      position: relative;
      top: 10px;
    }
    font-size: 12px;
    color: #fff;
    font-weight: normal;
    margin-bottom: 20px;
  }
  .el-menu .el-submenu .el-menu {
    background: #fff;
  }
  .el-submenu__title{
    i {
      right: auto;
      left: 50%;
      top: 21px;
    }
    color: $gray;
    &:hover{
      background-color: #fff;
      color: $blue;
    }
  }
  .el-submenu.is-active {
    .el-submenu__title{
      color: $blue;
    }
  }
  .menu-colse-btn{
    color: #fff;
    position: absolute;
    right: 20px;
    line-height: 60px;
    transform: rotate(-45deg);
  }
  @media screen and (max-width: 768px) {
    .main-logo { 
      height: 50px;
      line-height: 50px;
    }
    .menu-colse-btn {
      line-height: 50px;
    }
  }
</style>
