<template>
  <div class="block" v-if="totalCount > pageCount">
    <el-pagination
      background
      :page-size="pageCount"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Pagination',
    props: {
      totalCount: {
        type: Number,
        default: () => {
          return 0
        }
      },
      pageCount: {
        type: Number,
        default: () => {
          return 8
        }
      }
    },
    data() {
      return {
        currentPage: 1
      }
    },
    methods: {
      handleCurrentChange(e) {
        this.currentPage = e
        this.$emit('handleCurrentChange', e)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@/assets/stylus/mixin"

  .block
    text-align: center
    .el-pagination.is-background
      .el-pager
        li:not(.disabled).active
          background-color: $green-400
          color: $white
          &:hover
            color: $white
            background: $green-300
    .el-pagination.is-background
      .el-pager
        li:not(.disabled):hover
          color: $text-secondary-dark
          background: $green-50
    / .el-pagination__common
      margin: 0 7px
      background-color: #f4f4f5
      color: #606266
      width: 36px
      height: 34px
      line-height: 34px
      font-size: $text-size-large
      font-weight: normal
      border-radius: 3px
    .el-pagination.is-background
      .btn-next
        @extend .el-pagination__common
        &:hover
          background: $green-50
    .el-pagination.is-background
      .btn-prev
        @extend .el-pagination__common
        &:hover
          background: $green-50
    .el-pagination.is-background
      .el-pager
        li
          @extend .el-pagination__common

</style>
