<template>
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
          let userNameReg = /^[a-z]\w{3,15}/
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
            console.log(res.code)
            if (res.code === 200) {
              if (res.data.status === 'success') {
                this.$router.push('/')
              } else {
                alert('账号或密码错误')
              }
            } else {
              console.error(res.data.status)
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

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@/assets/stylus/mixin.styl"

  html
    height: 100%
    body
      position: relative
      height: 100%

  @media $phone
    .login-form
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      margin: auto
      width: 90%
      height: 400px

  @media $tablet
    .login-form
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      margin: auto
      width: 60%
      height: 400px

  @media $pc
    .login-form
      position: absolute
      top: 0
      bottom: 0
      left: 0
      right: 0
      margin: auto
      width: 20%
      height: 400px
</style>
