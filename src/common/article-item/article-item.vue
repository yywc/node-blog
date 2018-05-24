<template>
  <div class="article-item-wrapper">
    <article
      class="article"
      v-for="article in articles"
      :key="article.id"
    >
      <header class="line">
        <i class="iconfont icon-book"></i>
      </header>
      <h1 class="title">
        <router-link
          class="title-router"
          :to="getArticlePath(article)"
        >{{ article.title }}
        </router-link>
      </h1>
      <div class="meta">
        <em>阅读 {{ article.read_count }} / </em>
        <em>留言 {{ article.comment_count }}  / </em>
        <time :datetime="getTime(article)">{{ getTime(article) }}</time>
      </div>
      <p class="content">{{ getContent(article) }}</p>
      <router-link
        class="img-wrapper"
        v-if="article.avatar"
        :to="getArticlePath(article)"
      >
        <img
          class="img"
          :src="article.avatar"
          :alt="article.title"
        >
      </router-link>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'ArticleItem',
    props: {
      articles: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      getArticlePath(article) {
        return `/article/${article.article_id}`
      },
      getContent(article) {
        if (article.avatar) {
          if (article.content.length > 88) {
            return article.content.slice(0, 88) + '...'
          }
        } else if (article.content.length > 300) {
          return article.content.slice(0, 300) + '...'
        }
        return article.content
      },
      getTime(article) {
        return article.create_time ? article.create_time.split('T')[0] : ''
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .article-item-wrapper
    clear-float()
    .article
      position: relative;
      float: left
      margin-top: 40px;
      width: 450px
      height: 340px
      border-radius: 5px
      box-sizing: border-box
      &:first-of-type, &:nth-of-type(2)
        margin-top: 0
      &:nth-of-type(odd)
        margin-left: 25px
      &:nth-of-type(even)
        margin-left: 50px
      .line
        text-align: center
        &:before
          display: block
          content: ''
          border-top: 1px solid $line-dark
          position: relative
          top: 16px
        .iconfont
          display: inline-block
          position: relative
          top: 5px
          padding: 0 15px
          color: $text-primary-dark
          font-size: $text-size-large-x
          background: $white
      .title
        margin-top: 15px
        padding: 0 38px
        height: $height = 30px
        line-height: $height
        color: $text-primary-dark
        font-size: $text-size-large-x
        text-align: center
        no-wrap()
        .title-router:hover
          color: $green-400
      .meta
        margin: 7px 0
        height: $height = 20px
        line-height: $height
        text-align: center
        font-size: $text-size-small
        color: $text-secondary-dark
      .content
        padding: 0 15px
        text-indent: 2em
        min-height: 50px
        line-height: 1.8
        font-size: $text-size-medium
        color: $text-primary-dark
      .img-wrapper
        display: block
        margin: 15px auto 0
        width: 330px
        height: 150px
        border-radius: 3px
        .img
          display: block
          width: 100%
          height: 100%

</style>
