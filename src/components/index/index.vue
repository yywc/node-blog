<template>
  <div id="index">
    <em>hello world</em>
    <!--登录用户编辑-->
    <el-button v-if="this.$isLogin" @click="logout">退出</el-button>
    <ArticleItem :articles="this.articles"></ArticleItem>
  </div>
</template>

<script type="text/ecmascript-6">
  import {logout, getAllArticle} from '@/api/index'
  import Cookies from 'js-cookie'
  import ArticleItem from '@/common/article-item/article-item'

  export default {
    name: 'Index',
    data() {
      return {
        articles: []
      }
    },
    created() {
      getAllArticle()
        .then((res) => {
          if (res.status === 1) {
            this.articles = res.data
            console.log(res.data)
          } else {
            console.error('内部错误: ' + res.data)
          }
        })
        .catch((e) => {
          console.error('内部错误: ' + e.toString())
        })
    },
    methods: {
      logout() {
        if (!this.$isLogin) {
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
    },
    components: {
      ArticleItem
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
