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
        <h1 class="date-title">
          <em class="date-time">{{ articleArray[0].create_time.substr(0,7) }}</em>
        </h1>
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
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import TheNav from '@/common/the-nav/the-nav'
  import SubHeader from '@/common/sub-header/sub-header'
  import { getTags, getAllArticle } from '@/api/index'

  export default {
    name: 'Sort',
    data() {
      return {
        tags: [],
        category: 0,
        currentPage: 1,
        pageCount: 9999999999,
        articles: []
      }
    },
    components: {
      TheNav,
      SubHeader
    },
    created() {
      this._getTags()
      this._getAllArticle(this.currentPage, this.pageCount, this.category)
    },
    methods: {
      getArticlePath(article) {
        return `/article/${article.article_id}`
      },
      _getAllArticle(page, pageCount, category) {
        const data = {
          p: page,
          pc: pageCount,
          c: category
        }
        getAllArticle(data)
          .then((res) => {
            this.articles = res.data.data
            let times = []
            for (let article of res.data.data) {
              times.push(article.create_time.substr(0, 7))
            }
            // 取得非重复时间
            times = [...new Set(times)]
            const articles = []
            for (let time of times) {
              let arr = []
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
            if (res.status === 1) {
              this.tags = res.data
            } else {
              console.error('内部错误: ' + res.data)
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
        height: 30px
        .date-time
          padding: 7px 20px
          color: $text-secondary-dark
          border-radius: 3px
          background: $green-50
      .date-article
        display: block
        position: relative
        margin: 10px 0
        height: 30px
        line-height: 30px
        font-size: $text-size-large
        color: $text-secondary-dark
        text-indent: 11px
        &:hover
          color: $green-500
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
          right: 0
          font-size: $text-size-large
</style>
