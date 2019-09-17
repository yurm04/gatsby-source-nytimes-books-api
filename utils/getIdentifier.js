const {
  TYPE_LISTS,
  TYPE_OVERVIEW,
  TYPE_REVIEWS,
  TYPE_BEST_SELLERS_HISTORY,
  TYPE_DATE_LIST,
  TYPE_NAMES_LIST,
} = require("../constants")

function getIdentifier(type, node) {
  switch (type) {
    case TYPE_LISTS:
      var lcName = node.list_name.replace(/\s+/g, "-").toLowerCase()
      var lcTitle = node.book_details[0].title
        .replace(/\s+/g, "-")
        .toLowerCase()
      return `${lcName}-${lcTitle}`
    case TYPE_OVERVIEW:
      return node.best_sellers_date
    case TYPE_REVIEWS:
      return node.publication_dt
    case TYPE_BEST_SELLERS_HISTORY:
      return node.title
    case TYPE_DATE_LIST:
      return node.list_name_encoded
    case TYPE_NAMES_LIST:
    default:
      return node.list_name_encoded
  }
}

module.exports = getIdentifier
