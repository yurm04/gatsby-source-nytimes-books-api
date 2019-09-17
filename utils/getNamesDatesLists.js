const axios = require("axios")
const getResults = require("./getResults")
const { NYTIMES_API, LISTS_PATH, LISTS_NAMES_ENDPT } = require("../constants")

function getNamesDatesLists(options, reporter) {
  const { token, list, date = "current", offset } = options
  let apiUrl = `${NYTIMES_API}${LISTS_PATH}`
  const apiToken = `?api-key=${token}`
  let offsetParam

  /**
   * if the list name is sent we're getting the list for a date.
   * if date is not set in options, default to "current"
   *
   * https://developer.nytimes.com/docs/books-product/1/routes/lists/%7Bdate%7D/%7Blist%7D.json/get
   */
  if (list) {
    offsetParam = offset ? `&offset=${offset}` : ""
    apiUrl = `${apiUrl}/${date}/${list}${apiToken}${offsetParam}`
  } else {
    /**
     * if no list name specified, default to list names endpoint
     *
     * https://developer.nytimes.com/docs/books-product/1/routes/lists/names.json/get
     */
    apiUrl = `${apiUrl}${LISTS_NAMES_ENDPT}${apiToken}`
  }

  return axios(`${apiUrl}`)
    .then(data => getResults(data))
    .catch(err => reporter.error(`Could not get book lists: ${err}`))
}

module.exports = getNamesDatesLists
