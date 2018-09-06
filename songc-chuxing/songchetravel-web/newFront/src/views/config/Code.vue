<template>
  <div class="safeCode">
    <el-dialog :visible.sync="show" size="tiny" :close-on-click-modal="false">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-yellow">&#xe73a;</i>提示</h2>
      <el-form :model="form" ref="form" class="dialog-form clearfix" :rules="roles">
				<el-form-item prop="code">
					<el-input v-model="form.code" placeholder="请输入管理员手机验证码">
            <el-button slot="append":disabled="codeBtn" @click="sendCode">{{btnText}}</el-button>
          </el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" :loading="btnLoading" @click="submit">确 定</el-button>
			</div>
    </el-dialog>
  </div>
</template>

<script>
import { getSafeCodeStatus, getSafeCode, validSafeCode } from 'api/public';

export default {
  data () {
    return {
      form: {
        code: ''
      },
      show: false,
      btnLoading: false,
      codeBtn: false,
      btnText: '发送验证码',
      roles: {
        code: [
          { required: true, min:4, max: 4, message: '请输入4位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    const self = this
    getSafeCodeStatus().then(res => {
      if (parseInt(res.data.entity.needCode)) {
        this.show = false
        this.$emit('success')
      } else {
        this.show = true
      }
    }).catch(err => {
      this.show = true
      self.$message.error(err)
    })
  },
  methods: {
    cancel () {
      this.show = false
      this.$router.go(-1)
    },
    sendCode () {
      const self = this
      getSafeCode().then(res => {
        self.$message.success('恭喜，发生管理员手机验证码成功！')
        self.codeBtn = true
        self.form.code = ''
        let time = 60
        let timer = setInterval(function () {
          if (self.btnText === '0秒') {
            self.codeBtn = false
            self.btnText = '重新发生验证码'
            clearInterval(timer)
          } else {
            self.btnText = time-- + '秒'
          }
        }, 1000)
      }).catch(err => {
        self.$message.error(err)
      })
    },
    submit () {
      const self = this
      self.$refs.form.validate((valid) => {
        if (valid) {
          validSafeCode({safeCode: self.form.code}).then(res => {
            self.$message.success('恭喜，验证成功！')
            self.show = false
            this.$emit('success')
          }).catch(err => {
            self.$message.error(err)
          })
        }
      })
    },
  }
}

</script>

<style lang="scss">

</style>