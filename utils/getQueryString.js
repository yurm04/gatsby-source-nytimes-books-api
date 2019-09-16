const qs = require('querystring')

function getQueryString(paramValues, acceptedParams, queryObj = {}) {
  const paramKeys = Object.keys(paramValues)

  paramKeys.forEach(key => {
    if (acceptedParams.includes(key)) {
      queryObj[key] = paramValues[key]
    }
  });

  return qs.stringify(queryObj)
}

module.exports = getQueryString
