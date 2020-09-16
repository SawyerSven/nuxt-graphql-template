<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        brembo-front
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
      <!-- <ul>
        <li v-for="item in articles" :key="item.article_id">
          {{ item.article_id }}
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
// import { queryArticles } from '~/graphql/ql/foo.gql'
export default {
  name: 'Index',
  // async asyncData (ctx) {
  //   let res
  //   try {
  //     res = await ctx.app.$apollo.query({
  //       query: queryArticles,
  //       fetchPolicy: 'no-cache'
  //     })
  //   } catch (e) {
  //     res = []
  //   }
  //   return {
  //     articles: res
  //   }
  // },
  created () {
  },
  methods: {
    getData () {

    }
  }
}
</script>

<style lang="less">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
