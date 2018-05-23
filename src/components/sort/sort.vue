<template>
  <section>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <div class="tags">
        <a
          class="tag"
          href="#"
          v-for="(tag,index) in tags"
          :key="index"
        >
          <em class="dark">标签</em>
          <em class="light">{{tag}}</em>
        </a>
      </div>
      <div class="dates">2018-7</div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import TheNav from '@/common/the-nav/the-nav'
  import { getTags } from '@/api/index'

  export default {
    name: 'Sort',
    data() {
      return {
        tags: []
      }
    },
    components: {
      TheNav
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
    height: $height = 22px
    line-height: $height
    color: $white
    font-size: $text-size-small

  .nav-wrapper
    margin: 60px 0 0

  .main
    margin: 60px auto 50px
    width: 1000px
    .tag
      display: inline-block
      margin: 10px
      height: $height
      font-size: 0
      .dark
        padding: 0 7px
        border-bottom-left-radius: 4px
        border-top-left-radius: 4px
        background: #5e5e5e
        @extend .tag-common
      .light
        padding: 0 5px
        border-bottom-right-radius: 4px
        border-top-right-radius: 4px
        background: #6E87CA
        @extend .tag-common
</style>
