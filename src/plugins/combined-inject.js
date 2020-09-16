import apolloClient from '~/graphql/apollo/index'
import * as utils from '~/utils/'

export default ({ app }, inject) => {
  inject('apollo', apolloClient)
  inject('utils', utils)
}
