<template>
  <section>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <sub-header title="标签"></sub-header>
      <div class="tags">
        <router-link
          class="tag"
          :to="{path: '/tag/' + encodeURIComponent(tag)}"
          v-for="(tag,index) in tags"
          :key="index"
        >
          <em class="dark">tag</em>
          <em class="light">{{tag}}</em>
        </router-link>
      </div>
      <sub-header title="时间"></sub-header>
      <div
        class="date"
        v-for="(articleArray, index) in articles"
        :key="index"
      >
        <button
          class="date-title"
          @click="toggleFold(index)">
          {{ times[index] }}
          <i class="iconfont icon-right-arrow"></i>
        </button>
        <transition-group
          name="fold"
          @enter="enter"
          @after-enter="afterEnter"
          @leave="leave"
          @after-leave="afterLeave"
        >
          <router-link
            class="date-article"
            v-for="article in articleArray"
            :key="article.article_id"
            :to="getArticlePath(article)"
          >
            <em class="article-time">{{ article.create_time.substr(5,5) }}</em>
            <em class="article-title">{{ article.title }}</em>
            <em class="article-meta">
              阅读 {{ article.read_count }} /
              评论 {{ article.comment_count }}
            </em>
          </router-link>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import TheNav from '@/common/the-nav/the-nav'
  import SubHeader from '@/common/sub-header/sub-header'
  import { getTags, getAllArticle } from '@/api/index'
  import animations from 'create-keyframe-animation'
  import { prefixStyle, removeClass, hasClass, addClass } from '@/assets/js/utils'

  const transform = prefixStyle('transform')

  export default {
    name: 'Sort',
    data() {
      return {
        tags: [],
        category: 0,
        currentPage: 1,
        pageCount: 9999999999,
        articles: [],
        times: [],
        clickTimes: [],
        clickArticles: []
      }
    },
    components: {
      TheNav,
      SubHeader
    },
    created() {
      this._getTags()
      this._getAllArticle(this.currentPage, this.category, this.pageCount)
    },
    methods: {
      toggleFold(index) {
        if (hasClass(event.currentTarget.children[0], 'icon-left-arrow')) {
          addClass(event.currentTarget.children[0], 'icon-right-arrow')
          removeClass(event.currentTarget.children[0], 'icon-left-arrow')
        } else {
          addClass(event.currentTarget.children[0], 'icon-left-arrow')
          removeClass(event.currentTarget.children[0], 'icon-right-arrow')
        }
        // 判断是否点击同一个日期
        const result = this.clickTimes.findIndex((value) => {
          return value === index
        })
        if (result > -1) { // 展开
          // 删除对应位置的空串
          this.articles.splice(index, 1)
          // 添加对应折叠的文章
          this.articles.splice(index, 0, this.clickArticles[index])
          // 删除对应位置的存储数组的对应位置的文章
          this.clickArticles.splice(index, 1)
          // 给存储数组对应位置添加一个空串，保证索引的一致性
          this.clickArticles.splice(index, 0, '')
          // 删除存储索引数组里的对应位置的值
          this.clickTimes.splice(result, 1)
        } else { // 折叠
          this.clickTimes.push(index)
          this.clickArticles.splice(index, 1)
          this.clickArticles.splice(index, 0, this.articles[index])
          this.articles.splice(index, 1)
          this.articles.splice(index, 0, '')
        }
      },
      enter(el, done) {
        let animation = {
          0: {
            transform: `translate3d(50px,0, 0) scale(0.5)`,
            opacity: 0
          },
          100: {
            transform: `translate3d(0, 0, 0) scale(1)`,
            opacity: 1
          }
        }
        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })
        animations.runAnimation(el, 'move', done)
      },
      afterEnter(el) {
        animations.unregisterAnimation('move')
        el.style.animation = ''
      },
      leave(el, done) {
        el.style.transition = 'all 0.4s'
        el.style.opacity = '0'
        el.style[transform] = `translate3d(50px, 0, 0) scale(0.5)`
        el.addEventListener('transitionend', done)
      },
      afterLeave(el) {
        el.style.transition = ''
        el.style[transform] = ''
      },
      getArticlePath(article) {
        return `/article/${article.article_id}`
      },
      _getAllArticle(page, category, pageCount) {
        getAllArticle(page, category, pageCount)
          .then((res) => {
            this.articles = res.data.data
            for (let article of res.data.data) {
              this.times.push(article.create_time.substr(0, 7))
            }
            // 取得非重复时间
            this.times = [...new Set(this.times)]
            const articles = []
            for (let time of this.times) {
              let arr = []
              // 存储文章数组和时间数组长度一样
              this.clickArticles.push('')
              for (let article of res.data.data) {
                if (article.create_time.substr(0, 7) === time) {
                  arr.push(article)
                }
              }
              articles.push(arr)
            }
            // 依据非重复创建时间分组，二维数组
            this.articles = articles
          })
          .catch((e) => {
            console.error('内部错误: ' + e.toString())
          })
      },
      _getTags() {
        getTags()
          .then((res) => {
            if (res.code === 0) {
              this.tags = res.data
            } else {
              console.error('内部错误: ' + res.data.msg)
            }
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

  .tag-common
    display: inline-block
    height: $height = 24px
    line-height: $height
    color: $white
    font-size: $text-size-medium

  .nav-wrapper
    margin: 60px 0 0

  .main
    margin: 60px auto 50px
    width: 1000px
    .sub-header
      margin-bottom: 25px
    .tags
      margin-bottom: 50px
      .tag
        display: inline-block
        margin: 7px 10px
        height: 24px
        font-size: 0
        &:hover
          opacity: .8
        .dark
          padding: 0 7px
          border-bottom-left-radius: 4px
          border-top-left-radius: 4px
          background: #5e5e5e
          @extend .tag-common
        .light
          padding: 0 7px
          border-bottom-right-radius: 4px
          border-top-right-radius: 4px
          background: #59c441
          @extend .tag-common
    .date
      margin-bottom: 20px
      .date-title
        width: 120px
        height: 34px
        line-height: 34px
        color: $text-primary-dark
        text-align: center
        font-size: $text-size-large
        border-radius: 4px
        background: $green-50
        &:hover
          background: $green-100
        .iconfont
          margin-left: 3px
          color: $text-hint-dark
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.4s
      &.fold-enter, &.fold-leave-to
        opacity: 0
      .date-article
        display: block
        position: relative
        margin: 7px 0
        padding: 0 20px
        height: 34px
        line-height: 34px
        font-size: $text-size-large
        color: $text-secondary-dark
        border-radius: 4px
        &:hover
          color: $green-500
          background: $gray-200
        .article-time
          display: inline-block
          margin-right: 20px
          vertical-align: top
        .article-title
          display: inline-block
          max-width: 750px
          no-wrap()
        .article-meta
          position: absolute
          top: 0
          right: 27px
          font-size: $text-size-large
</style>
