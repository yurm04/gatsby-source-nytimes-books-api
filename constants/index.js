const TYPE_LISTS = 'lists'
const TYPE_DATE_LIST = 'date-list'
const TYPE_NAMES_LIST = 'names-list'
const TYPE_OVERVIEW = 'overview'
const TYPE_REVIEWS = 'reviews'
const TYPE_BEST_SELLERS_HISTORY = 'history'

exports.PLUGIN_NAME = 'gatsby-source-nytimes-books-api'
exports.NYTIMES_API = "https://api.nytimes.com/svc/books/v3"
exports.TYPE_LISTS = TYPE_LISTS
exports.TYPE_DATE_LIST = TYPE_DATE_LIST
exports.TYPE_NAMES_LIST = TYPE_NAMES_LIST
exports.TYPE_OVERVIEW = TYPE_OVERVIEW
exports.TYPE_REVIEWS = TYPE_REVIEWS
exports.TYPE_BEST_SELLERS_HISTORY = TYPE_BEST_SELLERS_HISTORY
exports.LISTS_PATH = "/lists"
exports.LISTS_NAMES_ENDPT = "/names.json"
exports.LISTS_OVERVIEW_ENDPT = '/overview.json'
exports.REVIEWS_ENDPT = '/reviews.json'
exports.LISTS_ENDPT = '/lists.json'
exports.BEST_SELLERS_ENDPT = '/lists/best-sellers/history.json'
exports.TYPES = [
  TYPE_LISTS,
  TYPE_DATE_LIST,
  TYPE_NAMES_LIST,
  TYPE_OVERVIEW,
  TYPE_REVIEWS,
  TYPE_BEST_SELLERS_HISTORY
]
