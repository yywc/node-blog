<template>
  <section class="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="title-wrapper">
      <input
        class="article-title"
        type="text"
        title="标题"
        ref="articleTitle"
        v-model="article.title"
      >
      <button
        class="btn-delete"
      >
        <el-button type="text" @click="centerDialogVisible = true">删除</el-button>
      </button>
      <button
        class="btn-submit"
        @click="submitArticle"
      >
        发布
      </button>
    </div>
    <div class="article-content">
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
    <div class="layer-wrapper" ref="layerWrapper">
      <pop-up-layer @close="closeLayer" :article="this.article" v-if="isLoaded"></pop-up-layer>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <span>确定要删除该文章吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="_deleteArticle">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script type="text/ecmascript-6">
  import PopUpLayer from '@/common/pop-up-layer/pop-up-layer'
  import { getArticle, deleteArticle } from '@/api/index'
  import { mapMutations } from 'vuex'
  import MarkdownIt from 'markdown-it'
  import hljs from 'highlight.js'

  const TIMER_DELAY = 233

  export default {
    name: 'ArticleWriter',
    components: {
      PopUpLayer
    },
    data() {
      return {
        article: {
          title: '',
          content: ''
        },
        isLoaded: false, // 控制获取文章后，正确传入 article 给子组件
        scrollTopPercent: 0,
        editorScrollFlag: true, // 控制添加监听事件，防止多次添加
        contentScrollFlag: true, // 控制添加监听事件，防止多次添加
        centerDialogVisible: false
      }
    },
    computed: {
      getContent() {
        return this.article.content ? this.md.render(this.article.content) : ''
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
      if (this.id) {
        this._getArticle({ articleId: this.id })
      } else {
        this.isLoaded = true
      }
    },
    mounted() {
      const editor = this.$refs.textareaContent
      const content = this.$refs.markdownContent
      editor.addEventListener('scroll', this.scroll)
      content.addEventListener('scroll', this.scroll)
      this.dataV = document.getElementsByClassName('main')[0].attributes[0].name
      // 改造 ui 框架样式
      document.getElementsByClassName('el-breadcrumb__inner')[0].setAttribute(this.dataV, '')
    },
    methods: {
      _getArticle(id) {
        getArticle(id)
          .then((res) => {
            this.article = res.data[0]
            this.isLoaded = true
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
      submitArticle() {
        if (this.article.title.trim() === '' || this.article.content.trim() === '') {
          this.$message.error('文章标题或者内容不能为空')
          return
        }
        this.$refs.layerWrapper.style.display = 'block'
        // 强行改变 ele-ui 下拉框样式为了好看点
        document.getElementsByClassName('el-scrollbar__wrap')[0].style.marginBottom = '-16px'
      },
      closeLayer() {
        this.$refs.layerWrapper.style.display = 'none'
      },
      _deleteArticle() {
        if (this.id) {
          deleteArticle({ article_id: this.id })
            .then((res) => {
              if (res.status === 1) {
                this.updateArticleTime()
                this.$message({
                  message: res.data,
                  type: 'success'
                })
                setTimeout(() => {
                  window.location.href = '/'
                }, 1000)
              } else {
                console.error('内部错误: ' + res.data)
              }
            })
            .catch((e) => {
              console.error('内部错误: ' + e.toString())
            })
        }
        this.centerDialogVisible = false
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
    margin: 20px auto 0
    width: $width = 1400px
    .el-breadcrumb
      margin-top: 30px
    .title-wrapper
      display: flex
      margin: 30px 0 10px
      .article-title
        flex: auto
        padding-left: 10px
        width: $width - 100
        height: 40px
        line-height: 40px
        font-size: $text-size-large-x
        border-radius: 3px
        border: 1px solid $line-dark
        box-sizing: border-box
        outline none
        &:focus
          border: 1px solid $green-100
      / .head-btn
        flex: 0 0 80px
        margin-left: 20px
        width: 80px
        height: 40px
        color: $white
        font-size: $text-size-medium
        letter-spacing: 3px
        box-sizing: border-box
        border: none
        border-radius: 3px
        cursor: pointer
      .btn-delete
        color: $text-primary-dark
        border: 1px solid $line-dark
        background: $gray-100
        @extend .head-btn
        &:hover
          color: $green-300
          border: 1px solid $green-100
          background: $green-50
        button
          width: 100%
          height: 100%
          color: $text-primary-dark
        &:hover button
          color: $green-300
      .btn-submit
        background: $green-400
        @extend .head-btn
        &:hover
          background: $green-300
    .article-content
      margin: 30px 0
      clear-float()
      / .passage
        float: left
        padding: 10px
        width: ($width / 2 - 10)
        height: 700px
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
        &:focus
          border: 1px solid $green-100
      .markdown-content
        border: 1px solid $line-dark
        border-radius: 3px
        overflow: auto
        @extend .passage

  .layer-wrapper
    display: none
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: rgba(0, 0, 0, .54)
    z-index: $z-index-top

  .el-breadcrumb__inner.is-link:hover
    color: $green-400
</style>
