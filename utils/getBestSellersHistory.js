const axios = require("axios")
const getResults = require("./getResults")
const getQueryString = require("./getQueryString")

const { NYTIMES_API, BEST_SELLERS_ENDPT } = require("../constants")

function getBestSellersHistory(options) {
  const { token, ...params } = options
  const queryObj = { "api-key": token }
  let apiUrl = `${NYTIMES_API}${BEST_SELLERS_ENDPT}`
  const acceptedParams = [
    "age-group",
    "author",
    "contributor",
    "isbn",
    "offset",
    "price",
    "publisher",
    "title",
  ]
  const queryString = getQueryString(params, acceptedParams, queryObj)
  apiUrl = `${apiUrl}?${queryString}`

  return axios(apiUrl)
    .then(data => getResults(data))
    .catch(err => console.log(`Could not get book reviews: ${err}`))
}

module.exports = getBestSellersHistory
// a changes
