<template>
  <footer class="footer">
    <span>版权所有 © (2018 - ?)</span>
    <span class="dividing">|</span>
    <span>独家赞助: 深圳市爱望舒科技有限公司 (我还没注册)</span>
    <span class="dividing">|</span>
    <a
      href="https://github.com/yywc"
      target="_blank"
    >
      <i class="iconfont icon-github"></i>
    </a>
    <span class="dividing">|</span>
    <a
      href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=gyjyywc@gmail.com"
      target="_blank"
    >
      <i class="iconfont icon-email"></i>
    </a>
    <span class="dividing">|</span>
    <a
      href="https://weibo.com/u/3294217170"
      target="_blank"
    >
      <i class="iconfont icon-microblog"></i>
    </a>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'TheFooter'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@/assets/stylus/mixin"

  .footer
    display: flex
    align-items: center
    justify-content: center
    margin: 0 auto
    min-width: 1200px
    width: 100%
    height: 50px
    line-height: 50px
    font-size: $text-size-small
    color: $text-secondary-dark
    border-top: 1px solid $line-dark
    box-sizing: border-box
    .dividing
      margin: 0 7px
      font-size: $text-size-large
    .iconfont
      font-size: $icon-size-large-x
      vertical-align: middle
      &:hover
        color: $green-400
</style>
