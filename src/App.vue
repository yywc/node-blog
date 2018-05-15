<template>
  <div id="app">
    <the-header></the-header>
    <keep-alive exclude="ArticleWriter,Article">
      <router-view></router-view>
    </keep-alive>
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
</style>
