<template>
  <div class="container">
    <a-form-model :model="form">
      <a-form-model-item label="account" prop="account">
        <a-input v-model="form.account" placeholder="account" />
      </a-form-model-item>
      <a-form-model-item label="password" prop="password">
        <a-input v-model="form.password" placeholder="password" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="setLogin">
          Submit
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getShopInfo } from "~/graphql/gql/home/home.gql"
export default {
  meta: {
    needLogin: true
  },
  name: "Index",
  async asyncData (ctx) {

  },
  data () {
    return {
      form: {
        account: '',
        password: ''
      }
    }
  },
  mounted () {
    this.getShopInfo()
  },
  methods: {
    ...mapMutations({
      setToken: 'user/setToken'
    }),
    async setLogin () {
      const res = await this.$http.user.setLogin(this.form)
      const { token, customer } = res
      this.setToken(token)
      console.log(customer)
    },
    async getShopInfo () {
      const res = await this.$http.client.query({
        query: getShopInfo,
        fetchPolicy: "no-cache"
      })
      return res
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
