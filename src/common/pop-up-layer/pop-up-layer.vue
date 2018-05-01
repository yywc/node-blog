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
    <p class="category">
      文章分类
      <el-select
        class="test"
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
    <div class="category-list">
      <input
        type="hidden"
        ref="category"
      >
      <button
        id="category"
        @click="addCategory"
      >
        <i class="el-icon-circle-plus">添加分类</i>
      </button>
    </div>
    <p class="label">文章标签</p>
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

  const Category = Vue.extend({
    data() {
      return {
        tagStyle: {
          float: 'left',
          display: 'flex',
          marginRight: '8px',
          lineHeight: '30px'
        },
        nameStyle: {
          marginTop: '5px',
          display: 'block',
          padding: '3px 8px',
          fontSize: '12px',
          maxWidth: '480px',
          background: '#e9e9e9',
          borderRadius: '2px',
          lineHeight: '15px',
          height: '21px',
          color: '#4f4f4f',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          outline: 'none'
        },
        iconStyle: {
          display: 'block',
          marginLeft: '3px',
          height: '12px',
          color: '#ddd',
          transition: 'color .3s ease-in',
          verticalAlign: '-1px',
          cursor: 'pointer'
        }
      }
    },
    template: '' +
    '<div :style="this.tagStyle">' +
    '<span :style="this.nameStyle" contenteditable="true"></span>' +
    '<i class="iconfont icon-close" :style="this.iconStyle"></i>' +
    '</div>'
  })

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
      addCategory() {
        const el = document.getElementById('category')
        // eslint-disable-next-line no-unused-expressions
        const tagEl = new Category().$mount().$el
        el.parentNode.insertBefore(tagEl, el)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .box
    position: absolute
    top: 40%
    left: 50%
    padding: 20px
    width: 650px
    height: 350px
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
    .category-list
      padding-left: 70px
    .label
      margin-top: 20px
    .button-wrapper
      margin-top: 20px

</style>
