<template>
  <el-container>
    <m-header></m-header>
    <el-footer>
      <m-footer></m-footer>
    </el-footer>
  </el-container>
</template>

<script type="text/ecmascript-6">
  import MHeader from '@/common/m-header/m-header'
  import MFooter from '@/common/m-footer/m-footer'

  export default {
    name: 'Article',
    components: {
      MFooter,
      MHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
