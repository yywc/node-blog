<template>
  <div class="main">
    <router-link
      class="edit"
      v-if="$isLogin"
      :to="routerPath"
    >编辑
    </router-link>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ this.article.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 class="title">
      {{ this.article.title }}
    </h1>
    <div class="meta">
      <span>javascript</span>
      <span>/</span>
      <time :datetime="getTime">{{ getTime }}</time>
    </div>
    <p
      class="markdown-content"
      v-html="getContent"
    ></p>
    <div class="page">
      <span>上一篇</span>
      <span class="next">下一篇</span>
    </div>
    <div class="entry-tag">
      <a
        class="tag"
        href="#"
        v-for="(tag,index) in articleTag"
        :key="index"
      >
        <em class="dark">tag</em>
        <em class="light">{{tag}}</em>
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
</template>

<script type="text/ecmascript-6">
  import TheHeader from '@/common/the-header/the-header'
  import TheFooter from '@/common/the-footer/the-footer'
  import { getArticle } from '@/api/index'
  import MarkdownIt from 'markdown-it'
  import hljs from 'highlight.js'

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
        return this.article.create_time ? this.article.create_time.split('T')[0] : ''
      },
      getContent() {
        return this.article.content ? this.md.render(this.article.content) : ''
      },
      routerPath() {
        return `/writer/${this.id}`
      },
      articleTag() {
        return this.article.tag ? this.article.tag.split(',') : []
      }
    },
    created() {
      this.md = new MarkdownIt({
        highlight: (str, lang) => {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return '<pre class="hljs"><code>' +
                hljs.highlight(lang, str, true).value +
                '</code></pre>'
            } catch (__) {
            }
          }
          return '<pre class="hljs"><code>' + this.md.utils.escapeHtml(str) + '</code></pre>'
        }
      })
      this.id = this.$route.params.id
      this.$_getArticle({ articleId: this.id })
    },
    mounted() {
      this.dataV = document.getElementsByClassName('header')[0].attributes[0].name
      // 改造 ui 框架样式
      document.getElementsByClassName('el-breadcrumb__inner')[0].setAttribute(this.dataV, '')
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

  .main
    position: relative
    margin: 5px auto
    width: 850px
    .edit
      position: absolute
      top: 30px
      right: 0
      font-size: $text-size-medium
      color: $text-primary-light
      margin-left: 20px
      width: 80px
      height: 30px
      line-height: 30px
      letter-spacing: 3px
      text-align: center
      box-sizing: border-box
      border-radius: 3px
      background: $green-500
      cursor: pointer
      &:hover
        background: $green-300
    .el-breadcrumb
      display: flex
      align-items: center
      margin-top: 30px
      height: 30px
    .title
      margin: 30px 0 10px
      font-size: $text-size-large-xx
      text-align: center
    .meta
      margin-bottom: 30px
      color: $text-hint-dark
      text-align: center
      font-size: $text-size-medium
    .markdown-content
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
      position: relative
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
      margin: 0 auto 20px
      padding: 30px 40px
      width: 680px
      height: 126px
      border: 1px solid $line-dark
      border-radius: 5px
      box-sizing: border-box
      background: $gray-100
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
        font-size: $text-size-medium
        color: $text-primary-light
        margin-left: 20px
        width: 80px
        height: 34px
        line-height: 34px
        letter-spacing: 3px
        text-align: center
        box-sizing: border-box
        border-radius: 3px
        border: none
        background: $green-500
        cursor: pointer
        &:hover
          background: $green-300

  .el-footer
    background: $blue-gray-800

  .el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover
    color: $green-500
</style>
