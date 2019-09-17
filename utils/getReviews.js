const axios = require("axios")
const getResults = require("./getResults")
const getQueryString = require("./getQueryString")
const { NYTIMES_API, PLUGIN_NAME } = require("../constants")

function getReviews(options, reporter) {
  const { token, ...params } = options
  const queryObj = { "api-key": token }
  const acceptedParams = ["isbn", "author", "title"]
  let apiUrl = `${NYTIMES_API}/reviews.json`
  const paramKeys = Object.keys(params)

  if (!paramKeys.length) {
    return new Promise(function(_, reject) {
      reporter.warn(
        `${PLUGIN_NAME}: reviews endpoint requires at least one query parameter value`
      )
      return reject()
    })
  }

  paramKeys.forEach(key => {
    const value = params[key]
    if (value) {
      queryObj[key] = params[key]
    }
  })

  const query = getQueryString(params, acceptedParams, queryObj)
  apiUrl = `${apiUrl}?${query}`

  return axios(apiUrl)
    .then(data => getResults(data))
    .catch(err => reporter.error(`Could not get book reviews: ${err}`))
}

module.exports = getReviews
