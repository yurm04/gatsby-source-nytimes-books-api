const axios = require('axios')

const PLUGIN_NAME = 'gatsby-source-nytimes-books-api'
const NYTIMES_API = "https://api.nytimes.com/svc/books/v3"
const TYPE_LISTS = 'lists'
const TYPE_OVERVIEW = 'overview'
const LISTS_ENDPT = "/lists"
const LISTS_NAMES_ENDPT = "/names.json"
const LISTS_OVERVIEW_ENDPT = '/overview.json'

function getToday() {
  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function getResults(resData) {
  return resData && resData.data && resData.data.results
}

function getBookLists(options) {
  const { token } = options
  
  return axios(`${NYTIMES_API}${LISTS_ENDPT}${LISTS_NAMES_ENDPT}?api-key=${token}`)
    .then(data => getResults(data))
    .catch(err => console.log(`Could not get book lists: ${err}`))
}

function getListOverview(options) {
  const { token, date = getToday() } = options

  return axios(`${NYTIMES_API}${LISTS_ENDPT}${LISTS_OVERVIEW_ENDPT}?api-key=${token}&published_date=${date}`)
    .then(data => getResults(data))
    .catch(err => console.log(`Could not get book list overview: ${err}`))
}
