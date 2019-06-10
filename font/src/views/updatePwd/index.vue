<template>
  <div class="updatePwd">
    <div class="login-body">
      <div class="login-center">
        <h1 class="logo" style="text-align: center; margin-bottom: 20px;">
          修改密码
        </h1>
        <el-form :model="formEdit" ref="formEdit" :rules="ruleEdit">
          <el-form-item prop="oldPwd">
            <el-input type="password" placeholder="请输入旧密码" v-model="formEdit.oldPwd" auto-complete="off" name="oldPwd"></el-input>
          </el-form-item>
          <el-form-item prop="newPwd">
            <el-input type="password" placeholder="请输入新密码" v-model="formEdit.newPwd" auto-complete="off" name="newPwd"></el-input>
          </el-form-item>
          <el-form-item prop="sNewPwd">
            <el-input type="password" placeholder="请重新输入新密码" v-model="formEdit.sNewPwd" auto-complete="off" name="sNewPwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleEdit('formEdit')">保存修改</el-button>
            <el-button @click="handleReset('formEdit')">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import qs from "qs"
  import ajax from "utils/ajax"
  import APIADDRESS from 'api/APIADDRESS'
  export default {
    data() {
      var checkPwModify = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入必填项"));
        } else if (value !== this.formEdit.newPwd) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        title: "修改密码",
        formLabelWidth: "180px",
        formEdit: {
          "oldPwd": "",
          "newPwd": "",
          "sNewPwd": ""
        },
        ruleEdit: {
          oldPwd: [{
            required: true,
            message: "请输入必填项",
            trigger: "blur"
          }],
          newPwd: [{
            required: true,
            message: "请输入必填项",
            trigger: "blur"
          }],
          sNewPwd: [{
            validator: checkPwModify,
            trigger: "blur"
          }]
        }
      };
    },
    created: function() {
  
    },
    mounted: function() {
      this.$nextTick(function() {
  
      });
    },
    methods: {
      handleReset(formName) {
        this.$router.go(-1)
      },
      handleEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("success submit!!");
            this.editSave();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      editSave() {
        console.log("edit save");
        var that = this;
        ajax.post(APIADDRESS + "/sys/user/uptatePwd",
          qs.stringify(this.formEdit),
          () => {
            that.$message({
              type: "success",
              message: "恭喜，修改密码成功！"
            });
            setTimeout(() => {
              this.$refs["formEdit"].resetFields();
              this.$router.push("/");
            }, 1000);
          },
          () => {},
          this
        );
      }
  
    }
  };
</script>

<style lang="scss">
  @import '../login/login';
</style>