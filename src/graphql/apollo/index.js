export default ctx => ({
  httpEndpoint: "http://localhost:4000",

  httpLinkOptions: {
    credentials: "same-origin"
  },
  // LocalStorage token
  tokenName: "apollo-token",

  // Enable Automatic Query persisting with Apollo Engine
  persisting: true,

  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false
})
