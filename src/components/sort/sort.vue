<template>
  <section>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <div class="categories">技术，杂谈</div>
      <div class="tags">es6</div>
      <div class="dates">2018-7</div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import TheNav from '@/common/the-nav/the-nav'

  export default {
    name: 'Sort',
    components: {
      TheNav
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .main
    margin: 60px auto 50px
    width: 1000px
</style>
