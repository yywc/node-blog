<template>
  <el-container class="form-wrapper">
    <el-form :model="loginForm"
             status-icon
             :rules="rules"
             ref="loginForm"
             label-width="70px"
             class="login-form">
      <el-form-item label="账号" prop="loginName">
        <el-input v-model.number="loginForm.loginName"></el-input>
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
  import {login} from '@/api/index'
  import Cookies from 'js-cookie'
  import {isLogin} from '@/common/base'

  export default {
    name: 'Login',
    data() {
      const validateLoginName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'))
        } else {
          const loginNameReg = /^[a-z]\w{3,15}/
          if (!loginNameReg.exec(value)) {
            callback(new Error('账号为4-16个字母或数字,且开头必须为字母'))
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
          loginName: '',
          password: ''
        },
        rules: {
          loginName: [
            {
              validator: validateLoginName, required: true, trigger: 'blur'
            }
          ],
          password: [
            {validator: validatePassword, required: true, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const data = {
              loginName: this.loginForm.loginName,
              password: this.loginForm.password
            }
            this._login(data)
          } else {
            console.error('请检查数据.')
            return false
          }
        })
      },
      _login(data) {
        if (isLogin) {
          this.$router.push('/')
        } else {
          login(data)
            .then((res) => {
              const data = res.data
              if (data.status === 1) {
                Cookies.set('TOKEN', res.headers['x-auth-token'], {expires: 30})
                window.location.reload()
                this.$router.push('/')
              } else {
                console.error(data.msg)
              }
            })
            .catch((error) => {
              console.error('内部错误: ' + error)
            })
        }
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
