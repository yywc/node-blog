<template>
  <div id="app">
    <the-header></the-header>
    <div class="wrapper">
      <keep-alive exclude="ArticleWriter,Article">
        <router-view class="content"></router-view>
      </keep-alive>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import TheHeader from '@/common/the-header/the-header'
  import TheFooter from '@/common/the-footer/the-footer'

  export default {
    name: 'App',
    components: {
      TheFooter,
      TheHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  html, body
    height: 100%
  #app
    height: 100%
    .wrapper
      padding-top: 50px
      min-height: 99.67%
      box-sizing: border-box
      .content
        padding-bottom: 50px
        overflow: hidden
    .footer
      margin-top: -50px

</style>
