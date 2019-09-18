const {
  getNamesDatesLists,
  getListOverview,
  isObject,
  getReviews,
  getBestSellersHistory,
  getIdentifier,
  getLists,
} = require("./utils")

const {
  PLUGIN_NAME,
  TYPE_LISTS,
  TYPE_OVERVIEW,
  TYPE_REVIEWS,
  TYPE_BEST_SELLERS_HISTORY,
  TYPE_DATE_LIST,
  TYPE_NAMES_LIST,
  TYPES,
} = require("./constants")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, reporter },
  options
) => {
  const { type, token } = options

  if (!token) {
    reporter.warn(`Unable to use ${PLUGIN_NAME}: API token is missing`)
    return
  }

  if (!type || !TYPES.includes(type)) {
    reporter.info(
      `\`type\` not valid for ${PLUGIN_NAME}.  Defaulting to \`type: list\` `
    )
  }

  const { createNode } = actions
  let data
  let identifierPrefix = "nytimes"
  let nodeType

  switch (type) {
    case TYPE_LISTS:
      identifierPrefix = `${identifierPrefix}-lists`
      nodeType = "TimesBooksList"
      data = await getLists(options, reporter)
      break

    case TYPE_OVERVIEW:
      identifierPrefix = `${identifierPrefix}-overview`
      nodeType = "TimesBooksListOverview"
      data = await getListOverview(options, reporter)
      break

    case TYPE_REVIEWS:
      identifierPrefix = `${identifierPrefix}-review`
      nodeType = "TimesBooksReview"
      data = await getReviews(options, reporter)
      break

    case TYPE_BEST_SELLERS_HISTORY:
      identifierPrefix = `${identifierPrefix}-best-seller`
      nodeType = "TimesBooksBestSellerHistory"
      data = await getBestSellersHistory(options, reporter)
      break

    case TYPE_DATE_LIST:
      identifierPrefix = `${identifierPrefix}-date-list`
      nodeType = "TimesBooksDateList"
      data = await getNamesDatesLists(options, reporter)
      break

    case TYPE_NAMES_LIST:
      identifierPrefix = `${identifierPrefix}-list-name`
      nodeType = "TimesBooksListName"
      data = await getNamesDatesLists(options, reporter)
      break

    default:
      reporter.warn(`${PLUGIN_NAME}: type of "${type}" not recognized`)
      break
  }

  const processNode = node =>
    Object.assign({}, node, {
      id: createNodeId(`${identifierPrefix}-${getIdentifier(type, node)}`),
      parent: null,
      children: [],
      internal: {
        type: nodeType,
        content: JSON.stringify(node),
        contentDigest: createContentDigest(node),
      },
    })

  return new Promise(function(resolve) {
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
      reporter.info(
        `No data returned from ${PLUGIN_NAME}, no Gatsby nodes created.`
      )
    }

    resolve()
  })
}
