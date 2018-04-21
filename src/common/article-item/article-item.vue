<template>
  <div class="wrapper">
    <article class="article" v-for="article in articles" :key="article.id">
      <h1>
        <router-link :to="getArticlePath(article)">
          {{article.title}}
        </router-link>
      </h1>
      <p>
        {{
        getContent(article)
        }}
      </p>
      <router-link :to="getArticlePath(article)" v-if="article.avatar">
        <img :src="article.avatar" :alt="article.title">
      </router-link>
      <div><em>点赞 23 / </em><em>阅读数 15 / </em><em>评论 12 / </em><em>分享</em></div>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'articleItem',
    props: {
      articles: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      getContent(article) {
        if (article.avatar) {
          if (article.content.length > 90) {
            return article.content.slice(0, 90) + '...'
          }
        } else if (article.content.length > 300) {
          return article.content.slice(0, 300) + '...'
        }
        return article.content
      },
      getArticlePath(article) {
        return `/article/${article.id}`
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .wrapper
    clear-float()
    .article
      position: relative;
      float: left
      margin-top: 75px;
      padding: 0 24px
      width: 510px
      height: 375px
      box-shadow: 5px 5px 15px 3px rgba(0, 0, 0, 0.25);
      border-radius: 5px
      box-sizing: border-box
      &:first-of-type, &:nth-of-type(2)
        margin-top: 0
      &:nth-of-type(odd)
        margin-left: 52.5px
      &:nth-of-type(even)
        margin-left: 75px
      h1
        margin-top: 10px
        padding: 0 14px
        height: 60px
        line-height: 60px
        color: $text-primary-dark
        font-size: $text-size-large-x
        text-align: center
        no-wrap()
        a:hover
          color: $green-500
      p
        text-indent: 2em
        min-height: 50px
        line-height: 1.8
        font-size: $text-size-medium
        color: $text-primary-dark
      a
        img
          display: block
          margin: 10px auto
          width: 410px
          height: 180px
          border-radius: 3px
      div
        position: absolute
        right: 0
        bottom: 10px
        left: 0
        height: 40px
        line-height: 40px
        text-align: center
        font-size: $text-size-small
        color: $text-secondary-dark

</style>
