<template>
  <el-form
    :model="validateForm"
    ref="validateForm"
    label-width="85px"
    class="comment-ruleForm"
    label-position="left"
  >
    <el-form-item
      label="昵称"
      prop="nickname"
      :rules="nicknameRules"
    >
      <el-input
        type="contact"
        v-model="validateForm.nickname"
        auto-complete="off"
        placeholder="请输入您的称呼"
        style="width: 200px;"
      >
      </el-input>
    </el-form-item>
    <el-form-item
      label="联系方式"
      prop="contact"
      :rules="contactRules"
    >
      <el-input
        type="nickname"
        v-model="validateForm.contact"
        auto-complete="off"
        placeholder="请输入您的联系方式(手机/QQ/微信/邮箱)"
        style="width: 300px;"
      >
      </el-input>
    </el-form-item>
    <el-form-item
      label="评论内容"
      prop="comment"
      :rules="commentRules"
    >
      <el-input
        type="textarea"
        v-model="validateForm.comment"
        auto-complete="off"
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="submitForm('validateForm')">发表评论</el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'TheComment',
    data() {
      return {
        nicknameRules: [
          { required: true, message: '昵称不能为空' }
        ],
        contactRules: [
          { required: true, message: '联系方式不能为空' }
        ],
        commentRules: [
          { required: true, message: '评论内容不能为空' }
        ],
        validateForm: {
          nickname: '',
          contact: '',
          comment: ''
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.error('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .comment-ruleForm
    margin-top: 70px
    padding-top: 30px
    border-top: 1px solid rgba(0, 0, 0, 0.12)
    .el-textarea__inner
      width: 680px
      height: 220px
      resize: none
      overflow-y: auto
</style>
