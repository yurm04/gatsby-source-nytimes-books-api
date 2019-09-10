const {
  getBookLists,
  getListOverview,
  isObject
} = require('./utils')

const { 
  PLUGIN_NAME,
  TYPE_LISTS,
  TYPE_OVERVIEW,
} = require('./constants')

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, reporter }, options) => {
  const { type, token } = options

  if (!token) {
    reporter.warn(`Unable to use ${PLUGIN_NAME}: API token is missing`)
    return
  }

  if (!type) {
    reporter.info(`\`type\` not set for ${PLUGIN_NAME}.  Defaulting to \`type: list\` `)
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
      nodeType = 'TimesListOverview'
      data = await getListOverview(options, reporter)
      break;

    case TYPE_LISTS:
    default:
      const { list } = options
      identifier = 'list_name_encoded'

      if (list) {
        identifierPrefix = `${identifierPrefix}-date-list`
        nodeType = 'TimesDateList'
      } else {
        identifierPrefix = `${identifierPrefix}-list`
        nodeType = 'TimesBookList'
      }
      
      data = await getBookLists(options, reporter)
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
