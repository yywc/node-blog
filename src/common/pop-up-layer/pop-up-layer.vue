<template>
  <div class="box">
    <h1 class="title">
      <em>发布博客</em>
      <i
        class="iconfont icon-close"
        @click="close"
      >
      </i>
    </h1>
    <div>
      <p class="category">
        文章分类
        <el-select
          class="select-category"
          v-model="value"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </p>
      <p class="notice">最多添加 5 个分类</p>
      <div class="category-list">
        <input
          type="hidden"
          ref="categoryValue"
          v-model="categoryList"
        >
        <div class="tag" v-for="(category, index) in this.categories" :key="index">
          <span
            class="name category-item"
            contenteditable="false"
          >
            {{category}}
          </span>
          <i
            class="iconfont icon-close"
            @click="_handlerClick"
          ></i>
        </div>
        <button
          class="add-category"
          id="addCategory"
          @click="addCategory"
        >
          <i class="el-icon-plus"></i>添加分类
        </button>
        <!--<div class="category-wrapper"></div>-->
      </div>
    </div>
    <div>
      <p class="label">文章标签<em class="notice-content">最多添加 5 个标签</em></p>
      <div class="tag-list">
        <input
          type="hidden"
          ref="tagValue"
          v-model="tagList"
        >
        <div class="tag" v-for="(tag, index) in this.tags" :key="index">
          <span
            class="name tag-item"
            contenteditable="false"
          >
            {{tag}}
          </span>
          <i
            class="iconfont icon-close"
            @click="_handlerClick"
          ></i>
        </div>
        <button
          class="add-tag"
          id="addTag"
          @click="addCategory"
        >
          <i class="el-icon-plus"></i>添加标签
        </button>
        <!--<div class="tag-wrapper"></div>-->
      </div>
    </div>
    <div class="button-wrapper">
      <button
        class="btn-cancel"
        @click="close"
      >取消
      </button>
      <button class="btn-submit" @click="submit">发布</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { addClass, hasClass, removeElementFromArray } from '@/assets/js/utils'
  import { updateArticle, addArticle } from '@/api/index'

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
        // 存放文章原有目录和标签
        categories: this.article.category ? this.article.category.split(',').slice(1) : [],
        tags: this.article.tag ? this.article.tag.split(',') : [],
        // 处理新建的目录和标签
        categoryList: [],
        tagList: [],
        options: [
          {
            value: '技术',
            label: '技术'
          },
          {
            value: '杂谈',
            label: '杂谈'
          }
        ],
        value: this.article.category ? this.article.category.split(',')[0] : ''
      }
    },
    mounted() {
      this.dataV = document.getElementsByClassName('box')[0].attributes[0].name
      // 改造 ui 框架样式
      document.getElementsByClassName('el-input__inner')[0].setAttribute(this.dataV, '')
    },
    methods: {
      close() {
        this.$emit('close')
      },
      addCategory(e) {
        const tagEl = this.buildNode()
        const addCategory = document.getElementById('addCategory')
        const addTag = document.getElementById('addTag')
        if (e.target === addCategory || e.target.parentNode === addCategory) {
          // 新增分类
          addClass(tagEl.children[0], 'category-item')
          const nameList = document.getElementsByClassName('category-item')
          if ((nameList.length > 0 && nameList[nameList.length - 1].textContent === '') || nameList.length > 4) {
            return
          }
          addCategory.parentNode.insertBefore(tagEl, addCategory)
        } else if (e.target === addTag || e.target.parentNode === addTag) {
          // 新增标签
          addClass(tagEl.children[0], 'tag-item')
          const nameList = document.getElementsByClassName('tag-item')
          if ((nameList.length > 0 && nameList[nameList.length - 1].textContent.trim() === '') || nameList.length > 4) {
            return
          }
          addTag.parentNode.insertBefore(tagEl, addTag)
        }
        tagEl.children[0].focus()
      },
      buildNode() {
        // 构建标签元素
        const div = document.createElement('div')
        div.setAttribute(this.dataV, '')
        div.setAttribute('class', 'tag')
        const span = document.createElement('span')
        span.setAttribute(this.dataV, '')
        span.setAttribute('class', 'name')
        span.setAttribute('contenteditable', 'true')
        const i = document.createElement('i')
        i.setAttribute(this.dataV, '')
        i.setAttribute('class', 'iconfont icon-close')
        div.appendChild(span)
        div.appendChild(i)

        const _this = this

        // 设置方法
        const _handlerBlur = function (e) {
          // 失焦的时候判断是否为空，是否与之前的值有相同
          if (e.target.textContent.trim() === '') {
            const target = e.target.parentNode
            target.parentNode.removeChild(target)
          } else {
            let nameList
            const category = hasClass(e.target, 'category-item')
            const tag = hasClass(e.target, 'tag-item')

            // 设置为不可编辑
            e.target.setAttribute('contenteditable', false)

            if (category) {
              nameList = document.getElementsByClassName('category-item')
              // 如果标签重复，则移除这个标签
              for (let i = 0, len = nameList.length - 1; i < len; i++) {
                // 如果与之前的值有相同，则移除该元素
                if (nameList[i].textContent.trim() === e.target.textContent.trim()) {
                  const target = e.target.parentNode
                  target.parentNode.removeChild(target)
                  return
                }
              }
              _this.categoryList.push(e.target.textContent.trim())
            } else if (tag) {
              nameList = document.getElementsByClassName('tag-item')
              // 如果标签重复，则移除这个标签
              for (let i = 0, len = nameList.length - 1; i < len; i++) {
                // 如果与之前的值有相同，则移除该元素
                if (nameList[i].textContent.trim() === e.target.textContent.trim()) {
                  const target = e.target.parentNode
                  target.parentNode.removeChild(target)
                  return
                }
              }
              _this.tagList.push(e.target.textContent.trim())
            }
          }
        }

        const _handlerEnter = function (e) {
          if (e.key === 'Enter') {
            _handlerBlur(e)
          }
        }

        span.addEventListener('blur', _handlerBlur)
        span.addEventListener('keydown', _handlerEnter)
        i.addEventListener('click', this._handlerClick)

        return div
      },
      _handlerClick(e) {
        const target = e.target.parentNode
        const targetChild = e.target.parentNode.children[0]
        if (hasClass(targetChild, 'tag-item')) {
          this.tagList = removeElementFromArray(this.tagList, targetChild.textContent)
          this.tags = removeElementFromArray(this.tags, targetChild.textContent)
        } else if (hasClass(targetChild, 'category-item')) {
          this.categoryList = removeElementFromArray(this.categoryList, targetChild.textContent)
          this.categories = removeElementFromArray(this.categories, targetChild.textContent)
        }
        target.parentNode.removeChild(target)
      },
      submit() {
        if (this.value === '') {
          this.$message.error('请选择必须的文章分类')
          return
        }
        const categoryArray = [...this.categories, ...this.categoryList]
        const tagArray = [...this.tags, ...this.tagList]
        categoryArray.unshift(this.value)
        const article = new Proxy(this.article, {
          set(trapTarget, key, value, receiver) {
            if (key === 'article_id') {
              throw new Error('禁止操作文章 Id')
            }
            return Reflect.set(trapTarget, key, value, receiver)
          }
        })
        // 转化为字符串
        article.category = categoryArray.join()
        article.tag = tagArray.toString() === '' ? undefined : tagArray.join()
        const data = {
          article: article
        }
        if (article.article_id) {
          updateArticle(data)
            .then((res) => {
              if (res.status === 1) {
                this.$message({
                  message: res.data,
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push(`/article/${article.article_id}`)
                }, 1500)
              } else {
                this.$message.error(res.data)
                console.error('内部错误: ' + res.data)
              }
            })
            .catch((e) => {
              console.error('内部错误: ' + e.toString())
            })
        } else {
          addArticle(data)
            .then((res) => {
              if (res.status === 1) {
                this.$message({
                  message: res.data,
                  type: 'success'
                })
                setTimeout(() => {
                  this.$router.push(`/`)
                }, 1500)
              } else {
                this.$message.error(res.data)
                console.error('内部错误: ' + res.data)
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
    background: $green-500
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
    width: 650px
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
    .notice
      margin-top: 7px
      padding-left: 80px
      font-size: $text-size-medium
      color: $text-hint-dark
    .category-list
      padding-left: 80px
      .category-wrapper
        @extend .list-wrapper
      .add-category
        @extend .btn-add
    .label
      margin-top: 20px
      .notice-content
        margin-left: 16px
        font-size: $text-size-medium
        color: $text-hint-dark
    .tag-list
      padding-left: 80px
      .tag-wrapper
        @extend .list-wrapper
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
        background: $green-500
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
    color: $green-500
</style>
