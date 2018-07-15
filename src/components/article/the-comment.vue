<template>
  <el-form
    :model="validateForm"
    ref="validateForm"
    label-width="85px"
    class="comment-ruleForm"
    label-position="left">
    <el-form-item
      label="昵称"
      prop="nickname"
      :rules="rules.nickname">
      <el-input
        type="contact"
        v-model="validateForm.nickname"
        auto-complete="off"
        placeholder="请输入您的称呼"
        style="width: 200px;">
      </el-input>
    </el-form-item>
    <el-form-item
      label="联系方式"
      prop="contact"
      :rules="rules.contact">
      <el-input
        type="nickname"
        v-model="validateForm.contact"
        auto-complete="off"
        placeholder="请输入您的联系方式(手机/QQ/微信/邮箱)"
        style="width: 300px;">
      </el-input>
    </el-form-item>
    <el-form-item
      label="评论内容"
      prop="comment"
      :rules="rules.comment">
      <el-input
        type="textarea"
        v-model="validateForm.comment"
        auto-complete="off">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="success"
        @click="submitForm('validateForm')">
        发表评论
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script type="text/ecmascript-6">
  import { addComment, checkUser } from '@/api/index'

  export default {
    name: 'TheComment',
    props: {
      articleId: {
        type: Number,
        required: true
      }
    },
    data() {
      const validateContact = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('联系方式不能为空'))
        } else {
          const mobileRegExp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
          const emailRegExp = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
          const qqRegExp = /[1-9][0-9]{4,}/
          const wechatRegExp = /^[a-zA-Z]{1}[-\w]{5,19}$/
          if (value.match(mobileRegExp) || value.match(emailRegExp) || value.match(qqRegExp) || value.match(wechatRegExp)) {
            callback()
          } else {
            callback(new Error('联系方式(手机/QQ/微信/邮箱)格式不正确'))
          }
        }
      }
      return {
        rules: {
          nickname: [
            { required: true, message: '昵称不能为空' }
          ],
          contact: [
            { required: true, message: '联系方式不能为空' },
            { validator: validateContact, trigger: 'blur' }
          ],
          comment: [
            { required: true, message: '评论内容不能为空' }
          ]
        },
        validateForm: {
          nickname: '',
          contact: '',
          comment: ''
        }
      }
    },
    created() {
      if (!this.$isLogin) {
        this._checkUser()
      }
    },
    methods: {
      _checkUser() {
        checkUser()
          .then((res) => {
            if (res.code === 0 && res.data.length !== 0) {
              this.validateForm.nickname = res.data[0].nickname
              this.validateForm.contact = res.data[0].contact
            }
          })
          .catch((e) => {
            console.error('内部错误: ' + e)
          })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const comment = {
              // article_id, user_id, nickname, contact, content, target_user_id
              articleId: this.articleId,
              nickname: this.validateForm.nickname,
              contact: this.validateForm.contact,
              content: this.validateForm.comment
            }
            addComment(comment)
              .then((res) => {
                if (res.code === 0) {
                  location.reload()
                } else {
                  console.error('评论失败, 请稍后再试')
                }
              })
              .catch((e) => {
                console.error('内部错误: ' + e)
              })
          } else {
            console.error('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .comment-ruleForm
    padding-top: 40px
    border-top: 1px solid rgba(0, 0, 0, 0.12)
    .el-textarea__inner
      width: 680px
      height: 220px
      resize: none
      overflow-y: auto
</style>
