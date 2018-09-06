<template>
  <div class="app-levelbar">
    <el-breadcrumb separator="/" v-if="!isMobile">
      <el-breadcrumb-item v-for="(item, index)  in levelList" :key="item.path">
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.name}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="mobile-title" v-if="isMobile">{{ levelList[levelList.length - 1].name }}</h1>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    created() {
      this.getBreadcrumb()
    },
    computed: {
      ...mapGetters([
        'isMobile'
      ])
    },
    data() {
      return {
        levelList: null
      }
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name);
        const first = matched[0];
        if (first && (first.name !== '首页' || first.path !== '')) {
          matched = [{ name: '首页', path: '/' }].concat(matched)
        }
        this.levelList = matched;
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-levelbar{
    line-height: 60px;
    .router-link-active { color: #fff; font-weight: bold; }
  }
  .el-breadcrumb {
    line-height: 56px;
    font-weight: bold;
    color: #fff;
    .el-breadcrumb__item {
      .el-breadcrumb__item__inner {
        color: #fff;
        .no-redirect {
          color: #fff;
        }
      }
    }
  }
  .el-breadcrumb__separator {
    color: #fff !important;
  }
  .app-levelbar.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 60px;
    margin-left: 10px;
    font-weight: bold;
    .no-redirect {
      color: #fff;
      cursor: text;
    }
  }
  .mobile-title {
    position: absolute;
    font-size: 16px;
    width: 100%;
    text-align: center;
    color: #fff;
    line-height: 50px;
  }
</style>
