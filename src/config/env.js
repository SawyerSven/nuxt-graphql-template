let API_URL = ""

switch (process.env.API_ENV) {
  case "sandbox":
    API_URL = process.server || process.env.NODE_ENV === "production" ? "http://brembo-backend-uat.cloud.bz/graphql" : '/graphql'
    break
  case "uat":
    API_URL = process.server || process.env.NODE_ENV === "production" ? "http://brembo-backend-uat.baozun.com/graphql" : '/graphql'
    break
  default:
    API_URL = process.server || process.env.NODE_ENV === "production" ? "https://api.liaoliaojun.com:3000/graphql" : "/graphql"
    break
}

export const TOKEN_COOKIE_NAME = "brembo-token"

export default {
  API_URL,
  TOKEN_COOKIE_NAME
}
