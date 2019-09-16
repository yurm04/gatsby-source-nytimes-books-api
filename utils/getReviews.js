const axios = require('axios')
const getResults = require('./getResults')
const qs = require('querystring')
const {
  NYTIMES_API,
  PLUGIN_NAME
} = require('../constants')

function getReviews(options, reporter) {
  const { token, isbn, author, title } = options
  const params = { isbn, author, title }
  let apiUrl = `${NYTIMES_API}/reviews.json`
  const paramKeys = Object.keys(params)
  let queryObj = {}

  if (!paramKeys.length) {
    return new Promise(function(_, reject) {
      reporter.warn(`${PLUGIN_NAME}: reviews endpoint requires at least one query parameter value`)
      return reject()
    })
  }

  paramKeys.forEach(key => {
    const value = params[key]
    if (value) {
      queryObj[key] = params[key]
    }
  })

  const query = qs.stringify({ 'api-key': token, ...queryObj })
  apiUrl = `${apiUrl}?${query}`
  
  return axios(apiUrl)
    .then(data => getResults(data))
    .catch(err => console.log(`Could not get book reviews: ${err}`))
}

module.exports = getReviews
