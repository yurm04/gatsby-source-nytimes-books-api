const axios = require('axios')
const getResults = require('./getResults')
const {
  NYTIMES_API,
  LISTS_ENDPT,
  LISTS_NAMES_ENDPT,
} = require('../constants')

function getBookLists(options) {
  const { token, list, date = 'current', offset } = options
  let apiUrl = `${NYTIMES_API}${LISTS_ENDPT}`

  /**
   * if the list name is sent we're getting the list for a date.
   * if date is not set in options, default to "current"
   * 
   * https://developer.nytimes.com/docs/books-product/1/routes/lists/%7Bdate%7D/%7Blist%7D.json/get
   */
  if (list) {
    const offset = offset ? `offset=${offset}` : ''
    apiUrl = `${apiUrl}/${date}/${list}${offset}`
  } else {
    /**
     * if no list name specified, default to list names endpoint
     * 
     * https://developer.nytimes.com/docs/books-product/1/routes/lists/names.json/get
     */
    apiUrl = `${apiUrl}${LISTS_NAMES_ENDPT}`
  }

  return axios(`${apiUrl}?api-key=${token}`)
    .then(data => getResults(data))
    .catch(err => console.log(`Could not get book lists: ${err}`))
}

module.exports = getBookLists
