const axios = require('axios')
const getResults = require('./getResults')
const qs = require('querystring')
const {
  NYTIMES_API,
  BEST_SELLERS_ENDPT,
} = require('../constants')

function getBestSellers(options, reporter) {
  const { token, ...params } = options
  const queryObj = { 'api-key': token }
  const paramKeys = Object.keys(params)
  let apiUrl = `${NYTIMES_API}${BEST_SELLERS_ENDPT}`
  const acceptedParams = [
    'age-group',
    'author',
    'contributor',
    'isbn',
    'offset',
    'price',
    'publisher',
    'title'
  ]
  
  paramKeys.forEach(key => {
    if (acceptedParams.includes(key)) {
      queryObj[key] = params[key]
    }
  });

  const queryString = qs.stringify(queryObj)
  apiUrl = `${apiUrl}?${queryString}`
  console.log(apiUrl)
  return axios(apiUrl)
    .then(data => getResults(data))
    .catch(err => console.log(`Could not get book reviews: ${err}`))
}

module.exports = getBestSellers
