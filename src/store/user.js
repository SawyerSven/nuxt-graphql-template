import { TOKEN_COOKIE_NAME } from '@/config/env'
export const state = () => ({
  token: null
})

export const getters = {
  getToken (state) {
    return state.token
  },
  isLogin (state) {
    return !!state.token
  }
}

export const mutations = {
  setStoreToken (state, token) {
    state.token = token
  },
  setToken (state, token) {
    state.token = token
    this.$cookies.set(TOKEN_COOKIE_NAME, token)
  }
}
