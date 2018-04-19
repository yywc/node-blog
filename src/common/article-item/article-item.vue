<template>
  <div class="wrapper">
    <article class="article" v-for="article in articles" :key="article.id">
      <h1>{{article.title}}</h1>
      <p>
        {{
        article.content.length > 90 ? article.content.slice(0, 90) + '...' :article.content
        }}
      </p>
      <a href="#"><img src="~@/assets/imgs/desk.jpg" alt=""></a>
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
    created() {
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
      margin: 40px 20px
      padding: 0 24px
      width: 560px
      border-top: 1px solid $line-dark
      box-sizing: border-box
      h1
        padding: 0 14px
        height: 60px
        line-height: 60px
        color: $text-primary-dark
        font-size: $text-size-large-x
        text-align: center
        no-wrap()
      p
        text-indent: 2em
        line-height: 1.8
        font-size: $text-size-medium
        color: $text-primary-dark
      a
        img
          display: block
          margin: 10px auto
          width: 452px
          height: 220px
      div
        height: 40px
        line-height: 40px
        text-align: center
        font-size: $text-size-small
        color: $text-secondary-dark

</style>
