<template>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="userName">
      <el-input v-model.number="ruleForm2.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
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
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        ruleForm2: {
          userName: '',
          pass: ''
        },
        rules2: {
          userName: [
            {
              validator: validateUserName, required: true, trigger: 'blur'
            }
          ],
          pass: [
            {validator: validatePass, required: true, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            this.$ajax
              .post('api/login', {
                userName: this.ruleForm2.userName,
                password: this.ruleForm2.pass
              })
              .then((res) => {
                console.log(res)
              })
              .catch((error) => {
                console.log('内部错误: ' + error)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
