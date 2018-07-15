<template>
  <el-pagination
    id="pagination"
    v-if="page.totalCount > page.pageCount"
    background
    :page-size="page.pageCount"
    :current-page="page.currentPage"
    @current-change="handleCurrentChange"
    layout="prev, pager, next"
    :total="page.totalCount"
  >
  </el-pagination>
</template>

<script type="text/ecmascript-6">
  import { setDataV } from '@/assets/js/util'

  export default {
    name: 'Pagination',
    props: {
      page: {
        type: Object,
        required: true
      }
    },
    watch: {
      page(newVal) {
        if (newVal.totalCount > newVal.pageCount) {
          this.$nextTick(() => {
            setDataV(document.getElementById('pagination'))
          })
        }
      }
    },
    methods: {
      handleCurrentChange(e) {
        this.$emit('handleCurrentChange', e)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/assets/stylus/mixin"

  html
    body
      .el-pagination.is-background
        text-align: center
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
