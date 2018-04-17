<template>
  <div>
    <div v-for="article in articles" :key="article.id">
      <h1>{{article.title}}</h1>
      <p>{{article.content}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'articleItem',
    props: {
      articles: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    created() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
