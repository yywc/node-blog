<template>
  <section class="main">
    <router-link
      class="edit"
      v-if="$isLogin"
      :to="routerPath"
    >编辑
    </router-link>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ article.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div
      class="upload-img"
      v-show="showImg"
      :style="styleObject"
    ></div>
    <h1 class="title">
      {{ article.title }}
    </h1>
    <div class="meta">
      <em>阅读 {{ article.read_count }} / </em>
      <em>留言 {{ article.comment_count }} / </em>
      <time :datetime="getTime">{{ getTime }}</time>
    </div>
    <p
      class="markdown-content"
      id="markdownContent"
      v-html="getContent"
    ></p>
    <div class="page">
      <span
        class="prev"
        @click="togglePage(leftPage)"
      >
        <i class="iconfont icon-left-arrow"></i>
        上一篇
      </span>
      <span
        class="next"
        @click="togglePage(rightPage)"
      >
        下一篇
        <i class="iconfont icon-right-arrow"></i>
      </span>
    </div>
    <div class="entry-tag">
      <router-link
        class="tag"
        :to="{path: '/tag/' + encodeURIComponent(tag)}"
        v-for="(tag,index) in articleTag"
        :key="index"
      >
        <em class="dark">tag</em>
        <em class="light">{{tag}}</em>
      </router-link>
    </div>
    <div class="user-detail">
      <img
        class="user-avatar"
        src="~@/assets/imgs/avatar.jpg"
        alt="眼已望穿"
      >
      <div class="user-info">
        <p class="user-name">眼已望穿</p>
        <p class="user-desc">如月之恒，如日之升</p>
      </div>
      <button class="share">分享</button>
    </div>
    <the-comment></the-comment>
    <!--点击放大图片-->
    <div class="img-large" @click="shrinkImg" v-show="showLargeImg">
      <img id="largeImg" src="" alt="">
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import TheComment from './the-comment'
  import { getArticle, pageTurning } from '@/api/index'
  import { mapMutations } from 'vuex'
  import MarkdownIt from 'markdown-it'
  import hljs from 'highlight.js'

  export default {
    name: 'Article',
    components: {
      TheComment
    },
    data() {
      return {
        article: {},
        leftPage: 0,
        rightPage: 1,
        showImg: false,
        styleObject: {},
        showLargeImg: false
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
        return `/writer/${this.$route.params.id}`
      },
      articleTag() {
        return this.article.tag ? this.article.tag.split(',') : []
      }
    },
    watch: {
      getContent(val, oldVal) {
        if (val !== oldVal) {
          const imgs = document.getElementById('markdownContent').getElementsByTagName('img')
          setTimeout(() => {
            for (let i = 0, len = imgs.length; i < len; i++) {
              imgs[i].style.cursor = 'zoom-in'
              imgs[i].addEventListener('click', (e) => {
                this.showLargeImg = true
                document.getElementById('largeImg').src = e.currentTarget.src
              })
            }
          }, 17)
        }
      }
    },
    created() {
      this.init()
      this._getArticle({ articleId: this.$route.params.id })
    },
    mounted() {
      this.dataV = document.getElementsByClassName('main')[0].attributes[0].name
      // 改造 ui 框架样式
      document.getElementsByClassName('el-breadcrumb__inner')[0].setAttribute(this.dataV, '')
    },
    methods: {
      shrinkImg(e) {
        this.showLargeImg = false
        e.currentTarget.src = ''
      },
      init() {
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
      },
      togglePage(direction) {
        pageTurning({
          id: this.$route.params.id,
          d: direction
        })
          .then((res) => {
            if (res.data.length === 0) {
              this.$message({
                message: '没有更多数据了.'
              })
            } else {
              this.article = res.data[0]
              this.$router.push('/article/' + res.data[0].article_id)
            }
          })
          .catch((e) => {
            console.error('内部错误: ' + e)
          })
      },
      _getArticle(id) {
        getArticle(id)
          .then((res) => {
            this.article = res.data[0]
            this.updateArticleTime()
            this.showImg = !!this.article.img
            this.styleObject = {
              marginTop: `20px`,
              height: `240px`,
              background: `url(${this.article.img}) no-repeat center / cover`,
              borderRadius: '5px'
            }
          })
          .catch((e) => {
            console.error('内部错误: ' + e.toString())
          })
      },
      ...mapMutations({
        updateArticleTime: 'SET_UPDATE_ARTICLE_TIME'
      })
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
      background: $green-400
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
      .category
        margin-left: 5px
    .markdown-content
      min-height: 50px
      line-height: 1.8
    .page
      position: relative
      margin-top: 25px
      padding-top: 15px
      font-size: $text-size-medium
      color: $text-secondary-dark
      border-top: 1px solid $line-dark
      .prev, .next
        cursor: pointer
        font-size: $text-size-large
        &:hover
          color: $green-500
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
          @extend .tag-common
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
        background: $green-400
        cursor: pointer
        &:hover
          background: $green-300
    .img-large
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      height: 100%
      width: 100%
      z-index: $z-index-top
      background: rgba(255, 255, 255, .8)
      img
        position: fixed
        top: 50%
        left: 50%
        min-height: 50%
        transform: translate3d(-50%, -50%, 0)
        cursor: zoom-out
        z-index: $z-index-top + 1

  .el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover
    color: $green-400

</style>
