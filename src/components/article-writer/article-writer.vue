<template>
  <el-container>
    <the-header></the-header>
    <section class="main">
      <div class="title">
        <input type="text" v-model="article.title" title="标题">
      </div>
      <div class="content">
        <textarea
          class="editor"
          title="文章内容"
          @scroll="scroll"
          ref="textareaContent"
          v-model="article.content"
        >
        </textarea>
        <p
          class="markdown-content"
          ref="markdownContent"
          v-html="getContent"
        >
        </p>
      </div>
    </section>
    <el-footer>
      <the-footer></the-footer>
    </el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import TheHeader from '@/common/the-header/the-header'
  import TheFooter from '@/common/the-footer/the-footer'
  import { getArticle } from '@/api/index'
  import MarkdownIt from 'markdown-it'
  import hljs from 'highlight.js'

  export default {
    name: 'ArticleWriter',
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
      getContent() {
        return this.article.content ? this.md.render(this.article.content) : ''
      }
    },
    created() {
      this.md = new MarkdownIt({
        highlight: function (str, lang) {
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
    methods: {
      $_getArticle(id) {
        getArticle(id)
          .then((res) => {
            this.article = res.data[0]
          })
          .catch((e) => {
            console.error('内部错误: ' + e.toString())
          })
      },
      scroll(e) {
        const ele = e.target
        const editor = this.$refs.textareaContent
        const shower = this.$refs.markdownContent
        const scrollTopPercent = ele.scrollTop / (ele.scrollHeight - ele.offsetHeight)
        if (ele === editor) {
          shower.scrollTop = (shower.scrollHeight - shower.offsetHeight) * scrollTopPercent
        } else if (ele === shower) {
          editor.scrollTop = (editor.scrollHeight - editor.offsetHeight) * scrollTopPercent
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .main
    margin: 60px auto 0
    width: $width = 1200px
    .title
      margin: 70px 0 10px
      font-size: $text-size-large-xx
      text-align: center
      input
        width: $width
        height: 30px
        box-sizing: border-box
    .content
      clear-float()
      / .passage
        float: left
        padding: 10px
        width: ($width / 2 - 10)
        height: 600px
        font-size: $text-size-medium
        line-height: 1.8
        box-sizing: border-box
      .editor
        margin-right: 20px
        @extend .passage
      .markdown-content
        border: 1px solid $line-dark
        border-radius: 3px
        overflow: auto
        @extend .passage

  .el-footer
    width: 100%
    min-width: 1200px
    background: $blue-grey-800
</style>
