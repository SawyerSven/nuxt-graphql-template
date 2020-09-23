import { setUserLogin } from '~/graphql/gql/account/registerAndLogin'
export default class User {
  constructor (client) {
    this.client = client
  }

  setLogin (params) {
    return this.client.mutate({
      mutation: setUserLogin,
      variables: { loginInfo: params }
    })
  }
}
