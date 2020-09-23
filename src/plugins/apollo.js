import { TOKEN_COOKIE_NAME } from '@/config/env'
// eslint-disable-next-line no-unused-vars
import User from '@/graphql/requests/user'
import { httpLink, errorLink, apiMiddleWare, createApolloClientInstance, createAuthLink } from '~/graphql/apollo/index.js'
export default function ({ store, app, route }, inject) {
  const token = app.$cookies.get(TOKEN_COOKIE_NAME) || null
  token && store.commit('user/setStoreToken', token)
  const tokenHeader = token ? {
    'UNEX-USER-TOKEN': token
  } : {}
  const authLink = createAuthLink(tokenHeader)
  const link = errorLink.concat(authLink).concat(httpLink)
  const apolloClientInstance = createApolloClientInstance(link)
  const apolloClient = {
    query () {
      return apiMiddleWare('query', apolloClientInstance)(...arguments)
    },
    mutate () {
      return apiMiddleWare("mutate", apolloClientInstance)(...arguments)
    } // eslint-disable-line
  }
  const http = {
    client: apolloClient,
    user: new User(apolloClient)
  }
  inject('http', http)
}
