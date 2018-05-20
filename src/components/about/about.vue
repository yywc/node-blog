<template>
  <section>
    <the-nav class="nav-wrapper"></the-nav>
    <div class="main">
      <div class="content-wrapper">
        <h1 class="title">剧情简介</h1>
        <p><em>技术</em>：后端是 node.js，前端是 vue.js，数据库采用的是 mysql。</p>
        <p><em>过程</em>：前后端以及设计全部由我一个人完成，主要用来记录一些开发中的技术问题以及平时读书的书摘或者读后感之类的，后续如果吉他水平上来了也会放几个视频装装逼 (手动狗头)。</p>
        <p><em>动机</em>：觉得市面上的博客软件都不太好看，起初准备是用 wordpress，但是改主题改起来也很麻烦，于是萌生了自己做的念头。况且自己做一个多么酷炫啊，于是就有了这个博客了。</p>
      </div>
      <div class="content-wrapper">
        <h1 class="title">演职员表</h1>
        <p><em>主演</em>：眼已望穿</p>
        <p><em>联系方式</em>：gayhub、gmail、 微博在底部有链接</p>
        <p><em>生平简介</em>：16年双非本科毕业，大四考研时忽然洪荒之力觉醒，先是自学了java，而后毕业在家转安卓，最后毕业半年找不到工作。最终通过对手指在键盘飞舞美妙的感觉的终极追求，自学前端找到了心仪的工作。力求成为通晓古今，上知天文（此处要手动狗头）的伟大程序猿！此生最大的目标就是撸的一手好代码，弹的一手好琴，并朝着这个方向矢志不渝。</p>
      </div>
      <div class="content-wrapper">
        <h1 class="title">幕后制作</h1>
        <p>制作过程是痛苦的，因为我总不能做出来的效果比现成的博客软件要丑吧，那我还做干嘛，于是设计成了一大问题。最后每个地方抄一点，加上 google design 的帮助，终于搞出第一版，勉强够看（手动扶额）。</p>
        <p>解决了设计问题，接下来就是后端服务问题，一个个 demo 扒，一条条 sql 语句查，也是搞定了基本的后端问题，然后前后联调。</p>
        <p>最后是前端页面展示，作为一个前端，当然前端不能落后了。于是经常性的重构，改命名啊，改书写顺序啊，毕竟有点代码洁癖，就是要写的好看。。</p>
        <p>最后希望如月之恒，如日之升。</p>
        <p class="name">眼已望穿</p>
        <p class="time">2018 年 5 月 20 日</p>
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
  @import "~@/assets/stylus/mixin"

  .main
    margin: 60px auto 50px
    width: 1000px
    .content-wrapper
      margin-bottom: 50px
      .title
        position: relative
        margin-bottom: 20px
        padding-left: 15px
        height: 36px
        line-height: 36px
        font-size: $text-size-large-x
        font-weight: bold
        border-left: 7px solid $green-400
        &:after
          position: absolute
          top: 50%
          left: 120px
          width: 865px
          height: 1px
          color: $gray-50
          background: $line-dark
          transform: translate3d(0, -50%, 0)
          content: ''
      p
        margin: 10px 0
        padding: 0 10px
        line-height: 1.6
        em
          font-weight: bold
      .name
        padding-right: 40px
      .name, .time
        text-align: right
</style>
