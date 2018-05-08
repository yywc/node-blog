<template>
  <div id="app">
    <keep-alive exclude="ArticleWriter">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  html, body
    height: 100%
    #app
      height: 100%
</style>
