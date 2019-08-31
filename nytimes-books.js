const axios = require('axios')
const uuid = require("uuid/v1");

const NYTIMES_API = "https://api.nytimes.com/svc/books/v3"
const LISTS_ENDPT = "/lists"
const LISTS_NAMES_ENDPT = "/names.json"

function getResults(resData) {
  return resData && resData.data && resData.data.results
}

export function getBookLists(token) {
  return axios(`${NYTIMES_API}${LISTS_ENDPT}${LISTS_NAMES_ENDPT}?api-key=${token}`)
    .then(getResults(data))
    .catch(err => console.error(`Could not get Book lists: ${err}`))
}
