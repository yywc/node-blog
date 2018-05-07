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
          ref="category"
          v-model="categoryList"
        >
        <button
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
          ref="tag"
          v-model="tagList"
        >
        <button
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
      <button class="btn-submit">发布</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { addClass, hasClass, removeElementFromArray } from '@/assets/js/utils'

  export default {
    name: 'PopUpLayer',
    data() {
      return {
        categoryList: [],
        tagList: [],
        options: [
          {
            value: '选项1',
            label: '技术'
          },
          {
            value: '选项2',
            label: '杂谈'
          }
        ],
        value: ''
      }
    },
    mounted() {
      this.dataV = document.getElementById('addTag').attributes[0].name
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

        const _handlerClick = function (e) {
          const target = e.target.parentNode
          const targetChild = e.target.parentNode.children[0]
          if (hasClass(targetChild, 'tag-item')) {
            _this.tagList = removeElementFromArray(_this.tagList, targetChild.textContent)
          } else if (hasClass(targetChild, 'category-item')) {
            _this.categoryList = removeElementFromArray(_this.categoryList, targetChild.textContent)
          }
          target.parentNode.removeChild(target)
        }

        const _handlerEnter = function (e) {
          if (e.key === 'Enter') {
            _handlerBlur(e)
          }
        }

        span.addEventListener('blur', _handlerBlur)
        span.addEventListener('keydown', _handlerEnter)
        i.addEventListener('click', _handlerClick)

        return div
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
      button
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
      button
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
          background: $green-400
      .btn-cancel
        margin-right: 15px
        color: $text-primary-dark
        border: 1px solid $line-dark
        background: $grey-100
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
      background: #e9e9e9
      border-radius: 2px
      line-height: 15px
      height: 21px
      color: #4f4f4f
      overflow: hidden
      white-space: nowrap
      box-sizing: border-box
      outline: none

  .tag
    .iconfont
      display: block
      margin-left: 3px
      height: 12px
      color: #ddd
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
