const {
  getNamesDatesLists,
  getListOverview,
  isObject,
  getReviews,
  getBestSellersHistory
} = require('./utils')

const { 
  PLUGIN_NAME,
  TYPE_LISTS,
  TYPE_OVERVIEW,
  TYPE_REVIEWS,
  TYPE_BEST_SELLERS_HISTORY,
  TYPE_DATE_LIST,
  TYPE_NAMES_LIST,
  TYPES,
} = require('./constants')

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, reporter }, options) => {
  const { type, token } = options

  if (!token) {
    reporter.warn(`Unable to use ${PLUGIN_NAME}: API token is missing`)
    return
  }

  if (!type || !TYPES.includes(type)) {
    reporter.info(`\`type\` not valid for ${PLUGIN_NAME}.  Defaulting to \`type: list\` `)
  }

  const { createNode } = actions
  let data
  let identifier
  let identifierPrefix = 'nytimes'
  let nodeType

  switch (type) {
    case TYPE_OVERVIEW:
      identifierPrefix = `${identifierPrefix}-overview`
      identifier = 'best_sellers_date'
      nodeType = 'TimesBooksListOverview'
      data = await getListOverview(options, reporter)
      break;
    
    case TYPE_REVIEWS:
      identifierPrefix = `${identifierPrefix}-review`
      identifier = 'publication_dt'
      nodeType = 'TimesBooksReview'
      data = await getReviews(options, reporter)
      break;

    case TYPE_BEST_SELLERS_HISTORY: 
      identifierPrefix = `${identifierPrefix}-best-seller`
      identifier = 'title'
      nodeType = 'TimesBooksBestSellerHistory'
      data = await getBestSellersHistory(options, reporter)
      break;

    case TYPE_DATE_LIST:
      identifier = 'list_name_encoded'
      identifierPrefix = `${identifierPrefix}-date-list`
      nodeType = 'TimesBooksDateList'
      data = await getNamesDatesLists(options, reporter)
      break;

    case TYPE_NAMES_LIST:
    default:
      identifier = 'list_name_encoded'
      identifierPrefix = `${identifierPrefix}-list-name`
      nodeType = 'TimesBooksListName'
      data = await getNamesDatesLists(options, reporter)
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
    if (data && data.length) {
      data.forEach(datum => {
        processedNode = processNode(datum)
        createNode(processedNode)
      })
    } else if (isObject(data)) {
      processedNode = processNode(data)
      createNode(processedNode)
    } else {
      reporter.info(`No data returned from ${PLUGIN_NAME}, no Gatsby nodes created.`)
    }

    resolve()
  })
}
