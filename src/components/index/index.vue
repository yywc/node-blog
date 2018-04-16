<template>
  <div id="index">
    <em>hello world</em>
    <!--登录用户编辑-->
    <el-button v-if="isLogin" @click="logout">退出</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import {isLogin} from '@/common/base'
  import {logout, getAllArticle} from '@/api/index'
  import Cookies from 'js-cookie'

  export default {
    name: 'Index',
    data() {
      return {
        isLogin: isLogin
      }
    },
    created() {
      getAllArticle()
        .then((res) => {
          console.log(res.data)
        })
        .catch((e) => {
          console.error('内部错误: ' + e.toString())
        })
    },
    methods: {
      logout() {
        if (!isLogin) {
          window.location.reload()
        } else {
          logout()
            .then((res) => {
              if (res.status === 1) {
                Cookies.remove('TOKEN')
                window.location.reload()
              } else {
                console.error(res.data.msg)
              }
            })
            .catch((error) => {
              console.error('内部错误: ' + error.toString())
            })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
