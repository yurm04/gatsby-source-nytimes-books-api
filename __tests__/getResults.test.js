const getResults = require("../utils/getResults")

describe("getResults", () => {
  test("returns response data from resp.data.results path", () => {
    const results = "🥳"
    const resp = { data: { results } }
    expect(getResults(resp)).toBe(results)
  })

  test("returns FALSY if data is not set", () => {
    const resp = { notData: "🚫" }
    expect(getResults(resp)).toBeFalsy()
  })

  test("returns FALSY if data.results is not set", () => {
    const resp = { data: { notResults: "🚫" } }
    expect(getResults(resp)).toBeFalsy()
  })
})
