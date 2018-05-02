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
        >
        <button
          id="addCategory"
          @click="addCategory"
        >
          <i class="el-icon-plus"></i>添加分类
        </button>
        <div class="category-wrapper">111</div>
      </div>
    </div>
    <div>
      <p class="label">文章标签<em>最多添加 5 个标签</em></p>
      <div class="tag-list">
        <input
          type="hidden"
          ref="tag"
        >
        <button
          id="addTag"
          @click="addCategory"
        >
          <i class="el-icon-plus"></i>添加标签
        </button>
        <div class="tag-wrapper">111</div>
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
  import Vue from 'vue'
  import Tag from '@/common/tag/tag'
  import { addClass } from '@/assets/js/base'

  const Category = Vue.extend(Tag)
  const TagComponent = Vue.extend(Tag)

  export default {
    name: 'PopUpLayer',
    data() {
      return {
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
    methods: {
      close() {
        this.$emit('close')
      },
      addCategory(e) {
        const addCategory = document.getElementById('addCategory')
        const addTag = document.getElementById('addTag')
        const tagEl = new Category().$mount().$el
        if (e.target === addCategory) {
          addClass(tagEl.children[0], 'category-item')
          const nameList = document.getElementsByClassName('category-item')
          if ((nameList.length > 0 && nameList[nameList.length - 1].textContent === '') || nameList.length > 4) {
            return
          }
          addCategory.parentNode.insertBefore(tagEl, addCategory)
        } else if (e.target === addTag) {
          addClass(tagEl.children[0], 'tag-item')
          const nameList = document.getElementsByClassName('tag-item')
          if ((nameList.length > 0 && nameList[nameList.length - 1].textContent === '') || nameList.length > 4) {
            return
          }
          addTag.parentNode.insertBefore(tagEl, addTag)
        }
        tagEl.children[0].focus()
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
    i
      margin-right: 3px

  .list-wrapper
    padding: 10px
    max-height: 150px
    border: 1px solid $line-dark
    border-radius: 3px

  .box
    position: absolute
    top: 40%
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
      em
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

</style>
