<template>
  <el-container>
    <the-header></the-header>
    <div class="main">
      <h1 class="title">
        {{ this.article.title }}
      </h1>
      <div class="meta">
        <span>javascript</span>
        <span>/</span>
        <time :datetime="getTime">{{ getTime }}</time>
      </div>
      <p class="content">{{ this.article.content }}</p>
      <div class="page">
        <span>上一篇</span>
        <span class="next">下一篇</span>
      </div>
      <div class="entry-tag">
        <a
          class="tag"
          href="#"
        >
          <em class="dark">tag</em>
          <em class="light">方法</em>
        </a>
        <a
          class="tag"
          href="#"
        >
          <em class="dark">tag</em>
          <em class="light">javascript</em>
        </a>
      </div>
      <div class="user-detail">
        <img
          class="user-avatar"
          src="~@/assets/imgs/avatar.jpg"
          alt="眼已望穿"
        >
        <div class="user-info">
          <p class="user-name">眼已望穿</p>
          <p class="user-desc">暂时不知道写什么东西</p>
        </div>
        <button class="share">分享</button>
      </div>
    </div>
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
    name: 'Article',
    components: {
      TheFooter,
      TheHeader
    },
    data() {
      return {
        article: {}
      }
    },
    computed: {
      getTime() {
        return this.article.create_date ? this.article.create_date.split('T')[0] : ''
      }
    },
    watch: {
      '$route'(to, from) {
        // data数据操作
        if (to.name === 'Article') {
          this.$_getArticle({ articleId: this.$route.params.id })
        }
      }
    },
    created() {
      this.$_getArticle({ articleId: this.$route.params.id })
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
  @import "~@/assets/stylus/mixin"

  .el-container
    height: 100%
    .main
      margin: 60px auto 0
      width: 800px
      height: 100%
      .title
        margin: 70px 0 10px
        font-size: $text-size-large-xx
        text-align: center
      .meta
        margin-bottom: 30px
        color: $text-hint-dark
        text-align: center
        font-size: $text-size-medium
      .content
        line-height: 1.8
      .page
        position: relative
        margin-top: 25px
        padding-top: 15px
        font-size: $text-size-medium
        color: $text-secondary-dark
        border-top: 1px solid $line-dark
        .next
          position: absolute
          right: 0
      .entry-tag
        margin: 50px auto 15px
        width: 680px
        box-sizing: border-box
        .tag
          display: inline-block
          margin-right: 10px
          height: $height = 22px
          font-size: 0
          /.tag-common
            display: inline-block
            height: $height
            line-height: $height
            color: $white
            font-size: $text-size-small
          .dark
            padding: 0 7px
            border-bottom-left-radius: 4px
            border-top-left-radius: 4px
            background: #5e5e5e
            @extends .tag-common
          .light
            padding: 0 5px
            border-bottom-right-radius: 4px
            border-top-right-radius: 4px
            background: #59c441
            @extend .tag-common
      .user-detail
        display: flex
        align-items: center
        margin: 0 auto
        padding: 30px 40px
        width: 680px
        height: 126px
        border: 1px solid $line-dark
        border-radius: 5px
        box-sizing: border-box
        background: $grey-100
        .user-avatar
          flex: 0 0 $dimension = 64px
          margin-right: 15px
          width: $dimension
          height: $dimension
          border-radius: 50%
        .user-info
          display: flex
          flex: 1
          flex-direction: column
          .user-name
            flex: 1
            line-height: 32px
            font-size: $text-size-large-x
          .user-desc
            flex: 1
            line-height: 32px
            font-size: $text-size-medium
            color: $text-secondary-dark
        .share
          flex: 0 0 100px
          height: 34px
          box-sizing: border-box

  .el-footer
    background: $blue-grey-800
</style>
