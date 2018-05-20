import ArticleItem from '@/common/article-item/article-item'
import TheNav from '@/common/the-nav/the-nav'
import Pagination from '@/common/pagination/pagination'
import { getAllArticle } from '@/api/index'
import { mapGetters, mapActions } from 'vuex'

const articleMixin = {
  components: {
    ArticleItem,
    TheNav,
    Pagination
  },
  data() {
    return {
      articles: [],
      page: {},
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters([
      'updateArticleTime',
      'articleOfSearch',
      'articleTitleOfSearch'
    ])
  },
  watch: {
    articleOfSearch(newVal, oldVal) {
      const arr = [...newVal]
      arr.pop()
      this.articles = arr
    }
  },
  created() {
    this._getAllArticle(this.currentPage, this.category)
  },
  deactivated() {
    // 如果有搜索条件，则清空并重新获取数据
    if (this.articleTitleOfSearch !== '') {
      this.setSearchArticle({
        title: '',
        articles: []
      })
      this._getAllArticle(this.currentPage, this.category)
    }
    // 如果有翻页，则恢复到第一页并重新获取数据
    if (this.page.currentPage !== 1) {
      this._getAllArticle(this.currentPage, this.category)
      // 更新 pagination 组件
      this.$refs.pagination.$children[0].handleCurrentChange(this.currentPage, this.category)
    }
  },
  methods: {
    _getAllArticle(page, category) {
      const data = {
        p: page,
        c: category
      }
      getAllArticle(data)
        .then((res) => {
          if (res.status === 1) {
            this.articles = res.data.data
            this.page = res.data
          } else {
            console.error('内部错误: ' + res.data)
          }
        })
        .catch((e) => {
          console.error('内部错误: ' + e.toString())
        })
    },
    handleCurrentChange(page) {
      this._getAllArticle(page, this.category)
    },
    ...mapActions([
      'setSearchArticle'
    ])
  }
}

export {
  articleMixin
}
