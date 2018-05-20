import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = (resolve) => {
  import('@/components/login/login')
    .then((module) => {
      resolve(module)
    })
    .catch((error) => {
      console.error('模块加载错误: ' + error.toString())
    })
}

const Index = (resolve) => {
  import('@/components/index/index')
    .then((module) => {
      resolve(module)
    })
    .catch((error) => {
      console.error('模块加载错误: ' + error.toString())
    })
}

const Article = (resolve) => {
  import('@/components/article/article')
    .then((module) => {
      resolve(module)
    })
    .catch((error) => {
      console.error('模块加载错误: ' + error.toString())
    })
}

const ArticleWriter = (resolve) => {
  import('@/components/article-writer/article-writer')
    .then((module) => {
      resolve(module)
    })
    .catch((error) => {
      console.error('模块加载错误: ' + error.toString())
    })
}

const Tech = (resolve) => {
  import('@/components/tech/tech')
    .then((module) => {
      resolve(module)
    })
    .catch((error) => {
      console.error('模块加载错误: ' + error.toString())
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
      path: '/writer',
      name: 'ArticleWriter',
      component: ArticleWriter,
      children: [
        {
          path: '/writer/:id',
          component: ArticleWriter
        }
      ]
    },
    {
      path: '/tech',
      name: 'Tech',
      component: Tech
    }
  ]
})
