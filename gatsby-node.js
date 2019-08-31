const axios = require('axios')
const queryString = require('querystring')

const NYTIMES_API = "https://api.nytimes.com/svc/books/v3"
const TYPE_LISTS = 'lists'
const TYPE_OVERVIEW = 'overview'
const LISTS_ENDPT = "/lists"
const LISTS_NAMES_ENDPT = "/names.json"
const LISTS_OVERVIEW_ENDPT = '/overview.json'

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
  const { token, date } = options
  return axios(`${NYTIMES_API}${LISTS_ENDPT}${LISTS_OVERVIEW_ENDPT}?api-key=${token}&published_date=${date}`)
    .then(data => getResults(data))
    .catch(err => console.log(`Could not get book list overview: ${err}`))
}

function isObject (value) {
  return value && typeof value === 'object' && value.constructor === Object;
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, options) => {
  const { type } = options
  const { createNode } = actions
  let data
  let identifier
  let identifierPrefix = 'nytimes'
  let nodeType

  switch (type) {
    case TYPE_LISTS:
      identifierPrefix = `${identifierPrefix}-list`
      identifier = 'list_name_encoded'
      nodeType = 'TimesBookList'
      data = await getBookLists(options)
      break;

    case TYPE_OVERVIEW:
      identifierPrefix = `${identifierPrefix}-overview`
      identifier = 'best_sellers_date'
      nodeType = 'TimesListOverview'
      data = await getListOverview(options)
      console.log(data)
      break;
    default:
      break;
  }
  
  const processNode = (node) => Object.assign({}, node, {
    id: createNodeId(`${identifierPrefix}-${node[identifier]}`),
    parent: null,
    children: [],
    internal: {
      type: nodeType,
      content: JSON.stringify(node),
      contentDigest: createContentDigest(node)
    }
  })

  return new Promise(function(resolve, reject) {
    let processedNode
    if (data.length) {
      data.forEach(datum => {
        processedNode = processNode(datum)
        createNode(processedNode)
        resolve();
      })
    } else if (isObject(data)) {
      processedNode = processNode(data)
      createNode(processedNode)
      resolve();
    } else {
      reject();
    }
  })
}
