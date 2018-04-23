<template>
  <div class="nav-wrapper">
    <img
      class="bg"
      src="~@/assets/imgs/header.png"
      alt="无欲则刚"
      @click="extraScene">
    <nav class="nav">
      <ul class="menu">
        <li class="router-item">
          <router-link to="/">
            <i class="iconfont icon-home"></i>首页
          </router-link>
        </li>
        <li class="router-item">
          <router-link to="/tech">
            <i class="iconfont icon-computer"></i>技术
          </router-link>
        </li>
        <li class="router-item">
          <router-link to="/note">
            <i class="iconfont icon-page"></i>杂谈
          </router-link>
        </li>
        <li class="router-item">
          <router-link to="/sort">
            <i class="iconfont icon-category"></i>分类
          </router-link>
        </li>
        <li class="router-item">
          <router-link to="/message">
            <i class="iconfont icon-message"></i>留言
          </router-link>
        </li>
        <li class="router-item">
          <router-link to="/statistics">
            <i class="iconfont icon-statistics"></i>统计
          </router-link>
        </li>
        <li class="router-item">
          <router-link to="/about">
            <i class="iconfont icon-people"></i>关于
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'TheNav',
    created() {
      this.extraSceneTrigger = 0
    },
    methods: {
      extraScene() {
        this.extraSceneTrigger++
        if (this.extraSceneTrigger > 5) {
          this.$alert('将子无怒，秋以为期', '眼已望穿', {
            showConfirmButton: false,
            center: true,
            lockScroll: false,
            callback: () => {
            }
          })
        } else if (!this.extraSceneTimer) {
          this.extraSceneTimer = setTimeout(() => {
            this.extraSceneTrigger = 0
            this.extraSceneTimer = null
          }, 1500)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .nav-wrapper
    margin: 60px 0 40px
    .bg
      display: block
      margin: 40px auto 15px
      width: 400px
    .nav
      width: 100%
      height: 50px
      .menu
        margin: 0 auto
        width: 1200px
        height: 40px
        line-height: 40px
        text-align: center
        .router-item
          display: inline-block
          padding: 0 15px
          color: $text-secondary-dark
          .router-link-active
            color: $green-500
          &:hover
            color: $green-500
        .iconfont
          margin-right: 3px
</style>
