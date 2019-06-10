<template>
  <div class="page-wrap">
    <el-form :inline="true" :model="formAdd" ref="formAdd" :rules="ruleAdd">
      <el-form-item label="品牌中文名">
        <el-input v-model="formAdd.brandCname" placeholder="请输入品牌中文名"></el-input>
      </el-form-item>
      <el-form-item label="品牌英文名">
        <el-input v-model="formAdd.brandEname" placeholder="请输入品牌英文名"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formAdd: {
        
      }
    }
  }
}
</script>

<style lang="less">

</style>


