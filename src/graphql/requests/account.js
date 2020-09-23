import apolloClient from "~/graphql/apollo"
import { setUserLogin } from '~/graphql/gql/account/registerAndLogin'

export const setLogin = (params) => {
  return apolloClient.mutate({
    mutation: setUserLogin,
    variables: { loginInfo: params }
  })
}
