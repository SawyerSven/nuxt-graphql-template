import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import fetch from 'node-fetch'
import { onError } from "apollo-link-error"
import {
  InMemoryCache
} from "apollo-cache-inmemory"

import omitDeep from "omit-deep-lodash"
import { find, get } from "lodash"
import env from '@/config/env'
import loading from "./middleware/loading"

const httpLink = new HttpLink({
  uri: env.API_URL,
  fetch
})

const errorLink = onError(({ networkError, response }) => {
  if (networkError && networkError.statusCode === 401) {
    // eslint-disable-next-line
    console.log('123')
    return
  }

  let errorMsg = ""
  if (response && response.errors && response.errors.length) {
    const error = response.errors[0]
    if (error.extensions) {
      const errorCode = error.extensions.errorCode
      if (errorCode === 401) {
        // 未登录
        // eslint-disable-next-line
        console.log('未登陆')
        return
      }
      if (errorCode === 403) {
        // 没有操作权限
        // eslint-disable-next-line
        console.log('无权限')
        if (loading) {
          loading.hide()
        }
        return
      }
    }
    errorMsg = error.message || "服务器错误"
  }

  if (networkError) {
    errorMsg = networkError.message
    if (networkError.result) {
      errorMsg = networkError.result.success
        ? networkError.result.error
        : networkError.result.message
    }
  }

  if (errorMsg) {
    if (process.server) {
      console.log('ERROR-------', errorMsg)
      console.log('ERROR-INFO:------------', networkError)
    }
    // Vue.prototype.$message.error(errorMsg)
  }
})

const apolloClientInstance = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),

  connectToDevTools: true,

  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only"
    },
    query: {
      fetchPolicy: "network-only"
    }
  }
})

const handleUserError = (response) => {
  const userErrors = get(response, "userErrors", [])
  if (userErrors && userErrors.length) {
    // Vue.prototype.$message.error(userErrors[0].message)
    throw new Error(`userError: ${userErrors[0].message}`)
  }
}

const omitTypename = response => omitDeep(response, "__typename")

const formatResponse = (graphql, response) => {
  const data = omitTypename(response).data
  // const data = response.data
  if (data === null) {
    throw new Error("服务器异常")
  }

  const operationDefinition = find(graphql.definitions, {
    kind: "OperationDefinition"
  })
  const selections = operationDefinition.selectionSet.selections

  if (selections.length === 1) {
    handleUserError(data[selections[0].name.value])
  }
  return selections.length === 1 ? data[selections[0].name.value] : data
}

const apiMiddleWare = apiType => async (params, config = {}) => {
  const { showLoading } = config
  if (showLoading) {
    loading.show()
  }
  try {
    const response = await apolloClientInstance[apiType](params)
    if (showLoading) {
      loading.hide()
    }
    return formatResponse(params.query || params.mutation, response)
  } catch (error) {
    if (showLoading) {
      loading.hide()
    }
    if (process.server) {
      console.log("params: ", params, 'apiType', apiType, error)
    }
    throw new Error(error.message)
  }
}

export const apolloClient = {
  query () {
    return apiMiddleWare("query")(...arguments)
  }, // eslint-disable-line
  mutate () {
    return apiMiddleWare("mutate")(...arguments)
  } // eslint-disable-line
}

export default apolloClient
