import apolloClient from '~/graphql/apollo/index'
import * as utils from '~/utils/'
import http from '~/graphql/requests'

export default ({ app }, inject) => {
  inject('apollo', apolloClient)
  inject('utils', utils)
  inject('http', http)
}
