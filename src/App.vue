<template>
  <div id="app">
    <the-header v-if="login"></the-header>
    <div class="app-wrapper">
      <keep-alive exclude="ArticleWriter">
        <router-view class="app-content"></router-view>
      </keep-alive>
    </div>
    <the-footer v-if="login" class="app-footer"></the-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import TheHeader from '@/common/the-header/the-header'
  import TheFooter from '@/common/the-footer/the-footer'

  export default {
    name: 'App',
    data() {
      return {
        login: true
      }
    },
    components: {
      TheFooter,
      TheHeader
    },
    watch: {
      $route(to, from) {
        this.login = to.name !== 'Login'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  html, body
    height: 100%

  #app
    height: 100%
    .app-wrapper
      padding-top: 50px
      min-width: 1200px
      width: 100%
      min-height: 99%
      box-sizing: border-box
      .app-content
        padding-bottom: 50px
        overflow: hidden
    .app-footer
      margin-top: -50px

</style>
