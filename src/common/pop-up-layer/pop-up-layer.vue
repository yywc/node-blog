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
      height: 170px
    .label
      margin-top: 20px
    .button-wrapper
      margin-top: 20px

</style>
