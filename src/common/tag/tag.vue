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
  import { hasClass } from '@/assets/js/base'

  export default {
    name: 'Tag',
    methods: {
      handlerBlur(e) {
        // 失焦的时候判断是否为空，是否与之前的值有相同
        if (e.target.textContent === '') {
          const target = e.target.parentNode
          target.parentNode.removeChild(target)
        } else {
          let nameList
          const category = hasClass(e.target, 'category-item')
          const tag = hasClass(e.target, 'tag-item')

          // 设置为不可编辑
          e.target.setAttribute('contenteditable', false)

          if (category) {
            nameList = document.getElementsByClassName('category-item')
            // 如果标签重复，则移除这个标签
            for (let i = 0, len = nameList.length - 1; i < len; i++) {
              this.categoryList += nameList[i].textContent + ','
              // 如果与之前的值有相同，则移除该元素
              if (nameList[i].textContent === e.target.textContent) {
                const target = e.target.parentNode
                target.parentNode.removeChild(target)
              }
            }
            this.categoryList += e.target.textContent
          } else if (tag) {
            nameList = document.getElementsByClassName('tag-item')
            // 如果标签重复，则移除这个标签
            for (let i = 0, len = nameList.length - 1; i < len; i++) {
              this.tagList += nameList[i].textContent + ','
              // 如果与之前的值有相同，则移除该元素
              if (nameList[i].textContent === e.target.textContent) {
                const target = e.target.parentNode
                target.parentNode.removeChild(target)
              }
            }
            this.tagList += e.target.textContent
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
    margin: 5px 8px 0 0
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
