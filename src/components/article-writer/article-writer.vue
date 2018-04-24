<template>
  <el-container>
    <the-header></the-header>
    <el-footer>
      <the-footer></the-footer>
    </el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import TheHeader from '@/common/the-header/the-header'
  import TheFooter from '@/common/the-footer/the-footer'
  import { getArticle } from '@/api/index'

  export default {
    name: 'ArticleWriter',
    components: {
      TheFooter,
      TheHeader
    },
    created() {
      this.id = this.$route.params.id
      this.$_getArticle({ articleId: this.id })
    },
    methods: {
      $_getArticle(id) {
        getArticle(id)
          .then((res) => {
            this.article = res.data[0]
          })
          .catch((e) => {
            console.error('内部错误: ' + e.toString())
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
