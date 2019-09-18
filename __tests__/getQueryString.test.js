const getQueryString = require("../utils/getQueryString")

describe("getQueryString", () => {
  const params = {
    one: "one",
    two: "two",
    three: "three",
  }
  const qs = "one=one&two=two"

  test("returns an empty string if no accepted params are passed", () => {
    const accepted = ["four", "five", "six"]

    expect(getQueryString(params, accepted)).toBe("")
  })

  test("returns a string with the included accepted params and values", () => {
    const accepted = ["one", "two"]
    expect(getQueryString(params, accepted)).toBe(qs)
  })

  test("returns a string with the included accepted params and values and default query object", () => {
    const accepted = ["one", "two"]
    const queryObj = { token: "someValue" }
    const additional = `token=someValue&${qs}`

    expect(getQueryString(params, accepted, queryObj)).toBe(additional)
  })
})
