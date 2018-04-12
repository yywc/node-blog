<template>
  <el-container class="form-wrapper">
    <el-form :model="loginForm"
             status-icon
             :rules="rules"
             ref="loginForm"
             label-width="70px"
             class="login-form">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model.number="loginForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import {login} from '@/common/api/login'

  export default {
    name: 'Login',
    data() {
      const validateUserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          const userNameReg = /^[a-z]\w{3,15}/
          if (!userNameReg.exec(value)) {
            callback(new Error('用户名为4-16个字母或数字,且开头必须为字母'))
          } else {
            callback()
          }
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [
            {
              validator: validateUserName, required: true, trigger: 'blur'
            }
          ],
          password: [
            {validator: validatePassword, required: true, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      _login(data) {
        login(data)
          .then((res) => {
            if (res.status === 1) {
              this.$router.push('/')
            } else {
              alert(res.msg)
            }
          })
          .catch((error) => {
            console.error('内部错误: ' + error)
          })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            const data = {
              userName: this.loginForm.userName,
              password: this.loginForm.password
            }
            this._login(data)
          } else {
            console.error('请检查数据.')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin.styl"

  .form-wrapper
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: url("./bg.jpg") no-repeat left
    background-size: cover
    .login-form
      position: absolute
      top: 45%
      left: 45%
      transform: translate3d(-50%, -50%, 0)

  @media $phone
    .login-form
      width: 90%

  @media $tablet
    .login-form
      width: 40%

  @media $pc
    .login-form
      width: 25%
</style>
