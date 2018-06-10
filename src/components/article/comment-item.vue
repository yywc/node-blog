<template>
  <li class="comment-item">
    <article>
      <p class="user">{{ this.commentItem.nickname }}</p>
      <p class="date">{{ this.commentItem.create_comment_time }}</p>
      <p class="content">{{ this.commentItem.comment }}</p>
    </article>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'CommentItem',
    props: {
      commentItem: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  .comment-item
    position: relative
    padding: 40px 0
    border-bottom: 1px solid $line-dark
    &:last-of-type
      border-bottom: none
    .user
      color: $green-500
    .date
      margin: 5px 0 10px
      color: $text-secondary-dark
</style>
