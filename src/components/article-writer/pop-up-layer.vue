<template>
  <div class="box" id="box">
    <h1 class="title">
      <em>发布博客</em>
      <i class="iconfont icon-close" @click="close"></i>
    </h1>
    <div>
      <p class="category">
        文章分类
        <el-select
          class="select-category"
          v-model="value"
          placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </p>
    </div>
    <div>
      <p class="label">文章标签<em class="notice-content">最多添加 5 个标签</em></p>
      <div class="tag-list">
        <div class="tag" v-for="(tag, index) in tags" :key="index">
          <span
            class="name"
            contenteditable="false"
            @keydown.enter="handlerEnter"
            @blur="handlerBlur">
            {{tag}}
          </span>
          <i class="iconfont icon-close" @click="handlerClick"></i>
        </div>
        <button
          class="add-tag"
          id="addTag"
          @click="addTag">
          <i class="el-icon-plus"></i>
          添加标签
        </button>
        <div class="tag-wrapper" v-if="tagList.length > 0">
          <div
            class="tag-check"
            v-for="(name, index) in tagList"
            :key="index">
            <label class="check-label" @click.stop="checkTag">
              <input
                class="tag-value"
                type="checkbox"
                :value="name"
                v-model="tags"
                disabled>
              <i class="iconfont icon-check" v-show="showCheckedIcon(name)"></i>
              <span class="tag-name">{{ name }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="button-wrapper">
      <button class="btn-cancel" @click="close">
        取消
      </button>
      <button class="btn-submit" @click.once="submit">发布</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { removeElementFromArray, setDataV } from '@/assets/js/util'
  import { updateArticle, addArticle, getTags } from '@/api/index'
  import { mapMutations } from 'vuex'

  export default {
    name: 'PopUpLayer',
    props: {
      article: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        tags: this.article.tag ? this.article.tag.split(',') : [],
        tagList: [],
        options: [
          {
            value: '技术',
            label: '技术'
          },
          {
            value: '生活',
            label: '生活'
          }
        ],
        value: this.article.category ? this.article.category.split(',')[0] : ''
      }
    },
    created() {
      this._getTags()
      this.$nextTick(() => {
        setDataV(document.getElementById('box'))
      })
    },
    methods: {
      ...mapMutations({
        updateArticleTime: 'SET_UPDATE_ARTICLE_TIME'
      }),
      close() {
        this.$emit('close')
      },
      checkTag(e) {
        const target = e.currentTarget.getElementsByClassName('tag-value')[0]
        const icon = target.nextElementSibling
        if (this.tags.length > 4 || target.checked) {
          target.checked = false
          icon.style.display = 'none'
          this.tags = removeElementFromArray(this.tags, target.value)
        } else if (!target.checked) {
          target.checked = true
          icon.style.display = 'inline-block'
          this.tags.push(target.value)
        }
      },
      showCheckedIcon(name) {
        return this.tags.includes(name)
      },
      _getTags() {
        getTags()
          .then((res) => {
            if (res.code === 0) {
              this.tagList = res.data
            } else {
              console.error('内部错误: ' + res.data.msg)
            }
          })
          .catch((e) => {
            console.error('内部错误: ' + e.toString())
          })
      },
      addTag() {
        if (this.tags.length > 4) {
          return
        }
        // 添加一个空值，使新的标签框出现
        this.tags.push('')
        const nameSpan = document.getElementsByClassName('name')
        this.$nextTick(() => {
          nameSpan[nameSpan.length - 1].setAttribute('contenteditable', 'true')
          nameSpan[nameSpan.length - 1].focus()
        })
      },
      handlerEnter(e) {
        e.target.blur()
      },
      handlerClick(e) {
        const targetChild = e.target.parentNode.children[0]
        this.tags = removeElementFromArray(this.tags, targetChild.textContent)
      },
      handlerBlur(e) {
        // 移除末尾空值
        this.tags.pop()
        e.target.setAttribute('contenteditable', 'false')
        // 失焦的时候判断是否为空，是否与之前的值有相同
        const value = e.target.textContent.trim()
        if (value !== '') {
          for (let tag of this.tags) {
            if (tag === value) {
              return
            }
          }
          this.tags.push(value)
        }
      },
      // 更新或新增文章
      submit() {
        if (this.value === '') {
          this.$message.error('请选择必须的文章分类')
          return
        }
        const article = new Proxy(this.article, {
          set(trapTarget, key, value, receiver) {
            if (key === 'article_id') {
              throw new Error('禁止操作文章 Id')
            }
            return Reflect.set(trapTarget, key, value, receiver)
          }
        })
        article.category = this.value
        // 转化为字符串
        article.tag = this.tags.toString() === '' ? undefined : this.tags.join()
        if (article.article_id) {
          updateArticle(article)
            .then((res) => {
              if (res.code === 0) {
                this.updateArticleTime()
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push(`/article/${article.article_id}`)
                }, 1000)
              } else {
                this.$message.error(res.data.msg)
                console.error('内部错误: ' + res.data.msg)
              }
            })
            .catch((e) => {
              console.error('内部错误: ' + e.toString())
            })
        } else {
          addArticle(article)
            .then((res) => {
              if (res.code === 0) {
                this.updateArticleTime()
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push('/')
                }, 1000)
              } else {
                this.$message.error(res.data.msg)
                console.error('内部错误: ' + res.data.msg)
              }
            })
            .catch((e) => {
              console.error('内部错误: ' + e.toString())
            })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .btn-add
    margin: 7px 0 10px
    padding: 4px 7px
    font-size: $text-size-small
    color: $white
    border: none
    border-radius: 3px
    background: $green-400
    cursor: pointer;
    &:hover
      background: $green-300
    .el-icon-plus
      margin-right: 3px

  .list-wrapper
    padding: 10px
    max-height: 150px
    border: 1px solid $line-dark
    border-radius: 3px

  .box
    position: absolute
    top: 45%
    left: 50%
    padding: 20px
    width: 630px
    background: $white
    border-radius: 3px
    transform: translate3d(-50%, -50%, 0)
    box-sizing: border-box
    .title
      position: relative
      height: 40px
      line-height: 40px
      font-size: $text-size-large-x
      color: $text-primary-dark
      .icon-close
        position: absolute
        right: 0
        padding: 0 10px
        font-size: $icon-size-large
        color: $text-hint-dark
        cursor: pointer
        &:hover
          color: $text-secondary-dark
    .category
      margin-top: 20px
      .select-category
        margin-left: 11px
    .label
      display: flex
      align-items: center
      margin-top: 20px
      .notice-content
        margin-left: 16px
        font-size: $text-size-medium
        color: $text-hint-dark
    .tag-list
      padding-left: 80px
      .tag-wrapper
        margin-top: 5px
        overflow: auto
        @extend .list-wrapper
        clear-float()
        .tag-check
          display: flex
          float: left
          align-items: center
          margin: 5px 10px
          width: 220px
          height: 22px
          color: $text-primary-dark
          font-size: $text-size-large
          line-height: 22px
          .check-label
            position: relative
            cursor: pointer
            .icon-check
              position: absolute
              top: 0
              left: -1px
              font-size: 19px
              color: $green-400
            &:before
              position: absolute
              top: 3px
              left: 0
              width: 16px
              height: 16px
              content: ''
              border-radius: 3px
              border: 1px solid $line-dark
              box-sizing: border-box
            .tag-value
              position: relative
              left: -9999px
              margin: 0
              padding: 0
            .tag-name
              display: inline-block
              margin-left: 8px
              max-width: 190px
              no-wrap()
      .add-tag
        @extend .btn-add
    .button-wrapper
      margin-top: 20px
      text-align right
      / .btn-common
        display: inline-block
        width: 70px
        height: 30px
        font-size: $text-size-medium
        border: none
        border-radius: 3px
        cursor: pointer
      .btn-submit
        color: $text-primary-light
        background: $green-400
        @extend .btn-common
        &:hover
          background: $green-300
      .btn-cancel
        margin-right: 15px
        color: $text-primary-dark
        border: 1px solid $line-dark
        background: $gray-100
        @extend .btn-common
        &:hover
          color: $green-300
          border: 1px solid $green-100
          background: $green-50

  .tag
    float: left
    display: flex
    margin: 5px 8px 0 0
    line-height: 30px
    .name
      margin-top: 5px
      display: block
      padding: 3px 8px
      font-size: 12px
      max-width: 480px
      background: $gray-300
      border-radius: 2px
      line-height: 15px
      height: 21px
      color: $gray-700
      overflow: hidden
      white-space: nowrap
      box-sizing: border-box
      outline: none

  .tag
    .iconfont
      display: block
      margin-left: 3px
      height: 12px
      color: $gray-400
      transition: color .3s ease-in
      vertical-align: -1px
      cursor: pointer

  .el-select .el-input.is-focus .el-input__inner
    border-color: $green-200

  .el-select:hover .el-input__inner
    border-color: $green-200

  .el-select .el-input__inner:focus
    border-color: $green-200

  .el-select-dropdown__item.selected
    color: $green-400
</style>
