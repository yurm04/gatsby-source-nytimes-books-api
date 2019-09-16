const TYPE_LISTS = 'lists'
const TYPE_OVERVIEW = 'overview'
const TYPE_REVIEWS = 'reviews'

exports.PLUGIN_NAME = 'gatsby-source-nytimes-books-api'
exports.NYTIMES_API = "https://api.nytimes.com/svc/books/v3"
exports.TYPE_LISTS = TYPE_LISTS
exports.TYPE_OVERVIEW = TYPE_OVERVIEW
exports.TYPE_REVIEWS = TYPE_REVIEWS
exports.LISTS_ENDPT = "/lists"
exports.LISTS_NAMES_ENDPT = "/names.json"
exports.LISTS_OVERVIEW_ENDPT = '/overview.json'
exports.REVIEWS_ENDPT = '/reviews.json'
exports.TYPES = [
  TYPE_LISTS,
  TYPE_OVERVIEW,
  TYPE_REVIEWS
]
