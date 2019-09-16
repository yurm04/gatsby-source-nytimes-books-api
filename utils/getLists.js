const axios = require('axios')
const getResults = require('./getResults')
const qs = require('querystring')
const {
  NYTIMES_API,
  LISTS_ENDPT,
} = require('../constants')

function getLists(options, reporter) {
  const { token, ...params } = options
  const queryObj = { 'api-key': token }
  const paramKeys = Object.keys(params)
  let apiUrl = `${NYTIMES_API}${LISTS_ENDPT}`
  const acceptedParams = [
    'list',
    'bestsellers-date',
    'published-date',
    'offset',
  ]
  
  paramKeys.forEach(key => {
    if (acceptedParams.includes(key)) {
      queryObj[key] = params[key]
    }
  });

  const queryString = qs.stringify(queryObj)
  apiUrl = `${apiUrl}?${queryString}`
  
  return axios(apiUrl)
    .then(data => getResults(data))
    .catch(err => console.log(`Could not get bestsellers lists: ${err}`))
}

module.exports = getLists
