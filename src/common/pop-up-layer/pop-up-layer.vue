<template>
  <div class="box">
    <h1 class="title">发布博客</h1>
    <p class="category">文章分类</p>
    <p class="label">文章标签</p>
    <div class="button-wrapper">
      <button class="btn-cancel">取消</button>
      <button class="btn-submit">发布</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'PopUpLayer'
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
      height: 40px
      line-height: 40px
      font-size: $text-size-large-x
      color: $text-primary-dark
    .category
      height: 200px
    .label
      height: 40px
    .button-wrapper
      height: 40px

</style>
