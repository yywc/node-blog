<template>
  <section>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <sub-header title="标签"></sub-header>
      <div class="tags">
        <router-link
          class="tag"
          :to="{path: '/tag/' + encodeURIComponent(tag)}"
          v-for="(tag,index) in tags"
          :key="index"
        >
          <em class="dark">tag</em>
          <em class="light">{{tag}}</em>
        </router-link>
      </div>
      <sub-header title="时间"></sub-header>
      <div class="dates">2018-7</div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import TheNav from '@/common/the-nav/the-nav'
  import SubHeader from '@/common/sub-header/sub-header'
  import { getTags } from '@/api/index'

  export default {
    name: 'Sort',
    data() {
      return {
        tags: []
      }
    },
    components: {
      TheNav,
      SubHeader
    },
    created() {
      this._getTags()
    },
    methods: {
      _getTags() {
        getTags()
          .then((res) => {
            if (res.status === 1) {
              this.tags = res.data
            } else {
              console.error('内部错误: ' + res.data)
            }
          })
          .catch((e) => {
            console.error('内部错误: ' + e.toString())
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .tag-common
    display: inline-block
    height: $height = 24px
    line-height: $height
    color: $white
    font-size: $text-size-medium

  .nav-wrapper
    margin: 60px 0 0

  .main
    margin: 60px auto 50px
    width: 1000px
    .sub-header
      margin-bottom: 25px
    .tags
      margin-bottom: 50px
      .tag
        display: inline-block
        margin: 7px 10px
        height: 24px
        font-size: 0
        .dark
          padding: 0 7px
          border-bottom-left-radius: 4px
          border-top-left-radius: 4px
          background: #5e5e5e
          @extend .tag-common
        .light
          padding: 0 7px
          border-bottom-right-radius: 4px
          border-top-right-radius: 4px
          background: #59c441
          @extend .tag-common
</style>
