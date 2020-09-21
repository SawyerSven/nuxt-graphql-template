let API_URL = ""

switch (process.env.API_ENV) {
  case "sandbox":
    API_URL = "https://api.liaoliaojun.com:3000/graphql"
    break
  case "uat":
    API_URL = "http://brembo-backend-uat.cloud.bz/graphiql"
    break
  default:
    API_URL = "http://brembo-backend-uat.cloud.bz/graphiql"
    break
}

export default {
  API_URL
}
