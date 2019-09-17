const axios = require("axios")
const getToday = require("./getToday")
const getResults = require("./getResults")
const {
  NYTIMES_API,
  LISTS_PATH,
  LISTS_OVERVIEW_ENDPT,
} = require("../constants")

function getListOverview(options, reporter) {
  const { token, date = getToday() } = options

  return axios(
    `${NYTIMES_API}${LISTS_PATH}${LISTS_OVERVIEW_ENDPT}?api-key=${token}&published_date=${date}`
  )
    .then(data => getResults(data))
    .catch(err => reporter.error(`Could not get book list overview: ${err}`))
}

module.exports = getListOverview
