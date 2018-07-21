<template>
  <div class="main" id="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="upload-wrapper">
      <el-upload
        class="upload-demo"
        drag
        accept=".jpeg, .jpg, .png"
        action="/api/upload-img"
        :show-file-list="false"
        :multiple="false"
        :on-success="uploadSuccess"
        :on-error="uploadFail"
        :class="{narrow: showImg}">
        <p class="el-article-theme">文章主题图</p>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div
        class="upload-img"
        v-show="showImg"
        :style="styleObject">
        <div class="icon-wrapper">
          <button class="btn-upload">
            <i class="iconfont icon-camera"></i>
          </button>
          <button
            class="btn-delete"
            @click="deleteUploadImg">
            <i class="iconfont icon-delete"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="title-wrapper">
      <input
        class="article-title"
        type="text"
        title="标题"
        ref="articleTitle"
        v-model.trim.lazy="article.title">
      <button class="btn-delete">
        <el-button
          type="text"
          @click="centerDialogVisible = true">
          删除
        </el-button>
      </button>
      <button class="btn-submit" @click="submitArticle">
        发布
      </button>
    </div>
    <div class="article-content">
        <textarea
          class="editor"
          title="文章内容"
          ref="textareaContent"
          v-model.trim="article.content">
        </textarea>
      <p
        class="markdown-content"
        ref="markdownContent"
        v-html="getContent">
      </p>
    </div>
    <div
      class="layer-wrapper"
      v-show="showPopUpLayer">
      <pop-up-layer
        @close="closeLayer"
        :article="this.article"
        v-if="isLoaded">
      </pop-up-layer>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>确定要删除该文章吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="_deleteArticle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import PopUpLayer from './pop-up-layer'
  import { getArticle, deleteArticle } from '@/api/index'
  import { mapMutations } from 'vuex'
  import MarkdownIt from 'markdown-it'
  import hljs from 'highlight.js'
  import { setDataV } from '@/assets/js/util'

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
        styleObject: {},
        showPopUpLayer: false,
        isLoaded: false, // 控制获取文章后，正确传入 article 给子组件
        scrollTopPercent: 0,
        editorScrollFlag: true, // 控制添加监听事件，防止多次添加
        contentScrollFlag: true, // 控制添加监听事件，防止多次添加
        centerDialogVisible: false,
        showImg: false,
        imgUrl: ''
      }
    },
    watch: {
      $route(to, from) {
        if (to.name === 'ArticleWriter' && from.name === undefined) {
          location.reload()
        }
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
        this._getArticle(this.id)
        if (this.article.img) {
        }
      } else {
        this.isLoaded = true
      }
      this.$nextTick(() => {
        setDataV(document.getElementById('main'))
      })
    },
    mounted() {
      const editor = this.$refs.textareaContent
      const content = this.$refs.markdownContent
      // 先添加滚动事件，当某一个滚动了的时候移除另一个的滚动，之后再添加移除，防止循环滚动
      editor.addEventListener('scroll', this.scroll)
      content.addEventListener('scroll', this.scroll)
    },
    methods: {
      deleteUploadImg() {
        this.styleObject = ''
        this.showImg = false
      },
      uploadSuccess(data) {
        if (data.success) {
          this.imgUrl = data.data.pictureUrl
          this.styleObject = {
            background: `url(${data.data.pictureUrl}) no-repeat center / cover`,
            borderRadius: '5px'
          }
          this.showImg = true
        }
      },
      uploadFail(error) {
        console.error('上传图片失败: ' + error)
      },
      _getArticle(id) {
        getArticle(id)
          .then((res) => {
            this.article = res.data.data.article
            this.isLoaded = true
            this.imgUrl = this.article.img
            this.styleObject = {
              background: `url(${this.article.img}) no-repeat center / cover`,
              borderRadius: '3px'
            }
            if (this.imgUrl) {
              this.showImg = true
            }
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
        // 滚动时移除另外一边的监听事件，防止循环滚动
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
        if (this.article.title === '' || this.article.content === '') {
          this.$message.error('文章标题或者内容不能为空')
          return
        }
        if (this.imgUrl) {
          this.article.img = this.imgUrl
        }
        this.showPopUpLayer = true
        // 强行改变 ele-ui 下拉框样式为了好看点
        document.getElementsByClassName('el-scrollbar__wrap')[0].style.marginBottom = '-16px'
      },
      closeLayer() {
        this.showPopUpLayer = false
      },
      _deleteArticle() {
        if (this.id) {
          deleteArticle(this.id)
            .then((res) => {
              if (res.code === 0) {
                this.updateArticleTime()
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                setTimeout(() => {
                  window.location.href = '/'
                }, 1000)
              } else {
                console.error('内部错误: ' + res.data.msg)
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
    padding: 0 25px
    width: $width = 1300px
    .el-breadcrumb
      margin-top: 30px
    .upload-wrapper
      position: relative
      .upload-img
        position: relative
        margin-top: 20px
        height: 240px
        .icon-wrapper
          position: absolute
          right: 0
          bottom: 0
          width: 96px
          height: 48px
          font-size: 0
          .iconfont
            font-size: $icon-size-large-x
            color: $white
          .btn-upload, .btn-delete
            width: 48px
            height: 48px
            line-height: 48px
            background: rgba(0, 0, 0, .75)
    .title-wrapper
      display: flex
      margin: 25px 0 10px
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
      margin: 25px 0
      clear-float()
      / .passage
        float: left
        padding: 10px
        width: ($width / 2 - 10)
        height: 650px
        font-size: $text-size-large
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
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: rgba(0, 0, 0, .54)
    z-index: $z-index-top

  .el-breadcrumb__inner.is-link:hover
    color: $green-400

  /* 正常情况上传样式 */
  .upload-demo
    margin-top: 20px
    .el-upload-dragger
      margin: 0 auto
      width: 1300px
      height: 240px
      &:hover
        border-color: $green-500
      .el-article-theme
        margin-top: 40px
        color: $text-secondary-dark
      .el-icon-upload
        margin: 25px 0 35px
      em
        color: $green-500

  /* 上传完一张图片后的样式 */
  .narrow
    position: absolute
    bottom: 0
    right: 48px
    height: 48px
    width: 48px
    opacity: 0
    cursor: pointer
    z-index: 2
    .el-upload-dragger
      margin: 0 auto
      width: 48px
      height: 48px

</style>
