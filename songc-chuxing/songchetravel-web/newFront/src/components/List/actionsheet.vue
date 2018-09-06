<template>
  <div class="actionsheet">
    <div class="showText" @click="open">
      操作
      <i class="iconfont">&#xe609;</i>
    </div>
    <div class="mask" :class="{'show': show}" @click="show=false">
    </div>
    <div class="opreat-btm" :class="{'show': show}">
      <div class="item" v-if="rolesFun(item.roles, item.statue, data, item.status)" :class="[item.type]" v-for="(item, index) in opreat" :key="index" @click="liClick(item, data, index)">
        {{ item.name }}
      </div>
      <div class="cancel-btn" @click="show=false">
        取消
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    props: {
      data: {
        type: Object,
        default: function () {
          return {}
        }
      },
      opreat: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    methods: {
      open () {
        this.show = true
      },
      liClick (item, data, index) {
        this.show = false
        item.click(index, this.data)
      },
      rolesFun (roles, statue, rows, status) {
        if (roles) {
          if (statue) {
            return statue.indexOf(rows[status]) > -1
          } else {
            return true
          }
        } else {
          return false
        }
      },
    }
  }
</script>

<style lang="scss">
  @import '../../styles/color';
  .actionsheet {
    .showText{
      font-size: 13px;
      text-align: right;
      color: $blue;
      .iconfont {
        font-size: 12px;
        color: $blue;
      }
    }
    .mask {
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .4);
      top: 0;
      left: 0;
      z-index: 999;
      display: none;
      &.show {
        display: block;
      }
    }
    .opreat-btm {
      position: fixed;
      width: 100%;
      bottom: -100%;
      transition: all .3s cubic-bezier(.55, 0, .1, 1);
      background-color: #f5f5f5;
      left: 0;
      font-size: 16px;
      z-index: 9999;
      &.show {
        bottom: 0;
      }
      .item {
        line-height: 50px;
        text-align: center;
        background-color: #fff;
        border-bottom: 1px solid #f3f3f3;
        &.detail,
        &.edit {
          color: $blue;
        }
        &.delete,
        &.cancel {
          color: $orange;
        }
      }
      .cancel-btn {
        text-align: center;
        background-color: #fff;
        margin-top: 10px;
        line-height: 50px;
      }
    }
  }
</style>