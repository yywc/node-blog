<template>
  <h1 class="sub-header">{{title}}</h1>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'SubHeader',
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .sub-header
    position: relative
    padding-left: 15px
    height: 36px
    line-height: 36px
    font-size: $text-size-large-x
    font-weight: bold
    border-left: 7px solid $green-400
    &:after
      position: absolute
      top: 50%
      left: 120px
      width: 865px
      height: 1px
      color: $gray-50
      background: $line-dark
      transform: translate3d(0, -50%, 0)
      content: ''

</style>
