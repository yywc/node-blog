import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = (resolve) => {
  import('@/components/login/login').then((module) => {
    resolve(module)
  })
}

const Index = (resolve) => {
  import('@/components/index/index').then((module) => {
    resolve(module)
  })
}

const Article = (resolve) => {
  import('@/components/article/article').then((module) => {
    resolve(module)
  })
}

const ArticleWriter = (resolve) => {
  import('@/components/article-writer/article-writer').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/writer/:id',
      name: 'ArticleWriter',
      component: ArticleWriter
    }
  ]
})
