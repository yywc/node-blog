<template>
  <div class="tag">
    <span
      class="name"
      contenteditable="true"
      @blur="handlerBlur"
    >
    </span>
    <i
      class="iconfont icon-close"
      @click="handlerClick"
    >
    </i>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Tag',
    methods: {
      handlerBlur(e) {
        if (e.target.textContent === '') {
          const target = e.target.parentNode
          target.parentNode.removeChild(target)
        } else {
          e.target.setAttribute('contenteditable', false)
          const nameList = document.getElementsByClassName('name')
          // 如果标签重复，则移除这个标签
          for (let i = 0, len = nameList.length - 1; i < len; i++) {
            if (nameList[i].textContent === e.target.textContent) {
              const target = e.target.parentNode
              target.parentNode.removeChild(target)
            }
          }
        }
      },
      handlerClick(e) {
        const target = e.target.parentNode
        target.parentNode.removeChild(target)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .tag
    float: left
    display: flex
    margin-right: 8px
    line-height: 30px
    .name
      margin-top: 5px
      display: block
      padding: 3px 8px
      font-size: 12px
      max-width: 480px
      background: #e9e9e9
      border-radius: 2px
      line-height: 15px
      height: 21px
      color: #4f4f4f
      overflow: hidden
      white-space: nowrap
      box-sizing: border-box
      outline: none
  .iconfont
      display: block
      margin-left: 3px
      height: 12px
      color: #ddd
      transition: color .3s ease-in
      vertical-align: -1px
      cursor: pointer
</style>
