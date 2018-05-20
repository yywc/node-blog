<template>
  <section>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <div class="content-info">
        hello info!
      </div>
      <div class="content-person">
        hello person!
      </div>
      <div class="content-summary">
        hello summary!
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import TheNav from '@/common/the-nav/the-nav'
  export default {
    name: 'About',
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
