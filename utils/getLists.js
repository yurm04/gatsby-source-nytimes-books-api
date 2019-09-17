const axios = require("axios")
const getResults = require("./getResults")
const getQueryString = require("./getQueryString")
const { NYTIMES_API, LISTS_ENDPT } = require("../constants")

function getLists(options, reporter) {
  const { token, ...params } = options
  const queryObj = { "api-key": token }
  let apiUrl = `${NYTIMES_API}${LISTS_ENDPT}`
  const acceptedParams = [
    "list",
    "bestsellers-date",
    "published-date",
    "offset",
  ]
  const queryString = getQueryString(params, acceptedParams, queryObj)
  apiUrl = `${apiUrl}?${queryString}`

  return axios(apiUrl)
    .then(data => getResults(data))
    .catch(err => reporter.error(`Could not get bestsellers lists: ${err}`))
}

module.exports = getLists
