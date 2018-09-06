<template>
  <div class="login-body">
    <div class="login-center">
      <h1 class="logo">
        <img class="logo-img" :src="logo" />
        共享汽车管理系统
      </h1>
      <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="0">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" name="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" name="password"></el-input>
        </el-form-item>
        <el-form-item prop="inputRandomCode">
          <el-input class="code-input" name="authCode" v-model="loginForm.inputRandomCode" @keyup.enter.native="handleLogin()" placeholder="请输入验证码"></el-input>
          <img class="codeImg" :src="codeImg" @click="fleshCode" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" name="submit" :loading="loading" class="btn" @click="handleLogin()">{{btnText}}</el-button>
        </el-form-item>
      </el-form>
      <!-- <div class="line-text">
        <a class="" name="register">注册</a>
        <a class="fr" name="forgetPasswd">忘记密码？</a>
      </div> -->
    </div>
  </div>
</template>

<script>
import APIADDRESS from 'api/APIADDRESS'

import router from '../../router'
export default {
  data () {
    return {
      logo: require('assets/logo.png'),
      btnText: '登录',
      loginForm: {
        username: '',
        password: '',
        inputRandomCode: ''
      },
      codeImg: APIADDRESS + '/sys/user/getImg?r=' + Math.random(),
      loading: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '最小长度 6 个字符', trigger: 'blur' }
        ],
        inputRandomCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.btnText = '登录中'
          this.$store.dispatch('Login', this.loginForm).then((data) => {
            this.loading = false
            if (data.result.resultCode === 0) {
              this.$store.dispatch('GetInfo').then(res => { // 拉取user_info
                this.$store.dispatch('ChangeRole', res.data.entity.permissions)
                const roles = res.data.entity.permissions
                this.$store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
                  router.addRoutes(this.$store.getters.addRouters) // 动态添加可访问路由表
                })
              })
              this.$router.push({ path: '/' });
              this.$message({
                message: '恭喜，登录成功！',
                type: 'success'
              })
            } else {
              this.codeImg = APIADDRESS + '/sys/user/getImg?r=' + Math.random()
              this.$message({
                message: data.result.resultMessage,
                type: 'error'
              })
            }
          }).catch(() => {
            this.codeImg = APIADDRESS + '/sys/user/getImg?r=' + Math.random()
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    fleshCode () {
      this.codeImg = APIADDRESS + '/sys/user/getImg?r=' + Math.random()
    }
  }
}
</script>

<style lang="scss">
  @import './login';
</style>
