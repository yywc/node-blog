<template>
  <el-container>
    <the-header></the-header>
    <section class="main">
      <div class="title-wrapper">
        <input
          class="article-title"
          type="text"
          title="标题"
          ref="articleTitle"
          v-model="article.title"
        >
        <button
          class="btn-submit"
          @click="submit"
        >
          发布
        </button>
      </div>
      <div class="content">
        <textarea
          class="editor"
          title="文章内容"
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
    <div class="layer-wrapper" ref="layerWrapper">
      <pop-up-layer @close="closeLayer"></pop-up-layer>
    </div>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import TheHeader from '@/common/the-header/the-header'
  import TheFooter from '@/common/the-footer/the-footer'
  import PopUpLayer from '@/common/pop-up-layer/pop-up-layer'
  // import { getArticle, updateArticle } from '@/api/index'
  import { getArticle } from '@/api/index'
  import MarkdownIt from 'markdown-it'
  import hljs from 'highlight.js'

  const TIMER_DELAY = 233

  export default {
    name: 'ArticleWriter',
    components: {
      TheFooter,
      TheHeader,
      PopUpLayer
    },
    data() {
      return {
        article: {},
        scrollTopPercent: 0,
        editorScrollFlag: true, // 控制添加监听事件，防止多次添加
        contentScrollFlag: true // 控制添加监听事件，防止多次添加
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
    mounted() {
      const editor = this.$refs.textareaContent
      const content = this.$refs.markdownContent
      editor.addEventListener('scroll', this.scroll)
      content.addEventListener('scroll', this.scroll)
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
        if (this.scrollTimer) {
          clearInterval(this.scrollTimer)
        }
        this.scrollTimer = setTimeout(() => {
          this.scrollCallback(e)
        }, TIMER_DELAY)
        this.scrollTop(e)
      },
      scrollTop(e) {
        const ele = e.target
        const editor = this.$refs.textareaContent
        const content = this.$refs.markdownContent
        const scrollTopPercent = ele.scrollTop / (ele.scrollHeight - ele.offsetHeight)
        if (ele === editor) {
          this.contentScrollFlag = true
          content.removeEventListener('scroll', this.scroll)
          content.scrollTop = (content.scrollHeight - content.offsetHeight) * scrollTopPercent
        } else if (ele === content) {
          this.editorScrollFlag = true
          editor.removeEventListener('scroll', this.scroll)
          editor.scrollTop = (editor.scrollHeight - editor.offsetHeight) * scrollTopPercent
        }
      },
      scrollCallback(e) {
        const ele = e.target
        const editor = this.$refs.textareaContent
        const content = this.$refs.markdownContent
        if (ele === editor && this.contentScrollFlag) {
          this.editorScrollFlag = false
          content.addEventListener('scroll', this.scroll)
        } else if (ele === content && this.editorScrollFlag) {
          this.contentScrollFlag = false
          editor.addEventListener('scroll', this.scroll)
        }
      },
      submit() {
        // todo 传参
        // const data = {
        //   articleId: this.id,
        //   title: this.article.title
        // }
        // updateArticle(data)
        //   .then((res) => {
        //     console.log(res)
        //   })
        //   .catch((e) => {
        //     console.error('内部错误: ' + e.toString())
        //   })
        this.$refs.layerWrapper.style.display = 'block'
        // 强行改变 ele-ui 下拉框样式为了好看点
        document.getElementsByClassName('el-scrollbar__wrap')[0].style.marginBottom = '-16px'
      },
      closeLayer() {
        this.$refs.layerWrapper.style.display = 'none'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .main
    margin: 60px auto 0
    width: $width = 1200px
    .title-wrapper
      margin: 70px 0 10px
      font-size: $text-size-large-xx
      text-align: center
      .article-title
        width: $width - 100
        height: 30px
        box-sizing: border-box
      .btn-submit
        width: 80px
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
        outline: none
        resize: none
        border: 1px solid $line-dark
        border-radius: 3px
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

  .layer-wrapper
    display: none
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: rgba(0, 0, 0, .54)

</style>
