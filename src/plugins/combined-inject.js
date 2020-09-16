import apolloClient from '~/graphql/apollo/index'

export default ({ app }, inject) => {
  inject('apollo', apolloClient)
}
