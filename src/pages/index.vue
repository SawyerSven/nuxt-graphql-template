<template>
  <div class="container">
    <ul>
      <img :src="articles.logo" alt="">
      <h1>{{ articles.name }}</h1>
    </ul>
  </div>
  </div>
</template>

<script>
import { getShopInfo } from "~/graphql/gql/home/home.gql"
export default {
  name: "Index",
  async asyncData (ctx) {
    const res = await ctx.app.$apollo.query({
      query: getShopInfo,
      fetchPolicy: "no-cache"
    })
    return {
      articles: res
    }
  },
  created () {},
  // async mounted () {
  //   let res
  //   try {
  //     res = await this.$apollo.query({
  //       query: queryShop,
  //       fetchPolicy: "no-cache"
  //     })
  //     console.log(res)
  //   } catch (e) {
  //     console.log(e)
  //     res = []
  //   }
  //   return {
  //     articles: res
  //   }
  // },
  methods: {}
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
