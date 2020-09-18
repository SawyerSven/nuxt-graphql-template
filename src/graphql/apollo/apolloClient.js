import ApolloClient from "apollo-boost"
import fetch from "node-fetch"
import "graphql-tag"

const defaultClient = new ApolloClient({
  uri: "https://api.liaoliaojun.com:3000/graphql",
  fetch
  // httpLinkOptions: {
  //   includeExtensions: true,
  //   credentials: 'include',
  // },
})

defaultClient.defaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only"
  },
  query: {
    fetchPolicy: "network-only"
  }
}

const apolloClients = {
  default: defaultClient,
  defaultClient
}

export default function useApolloClient (arg) {
  if (!arg) {
    return apolloClients
  }
  if (typeof arg === "string") {
    return apolloClients[arg]
  }
  if (typeof arg === "object") {
    Object.assign(apolloClients, arg)
  }
}