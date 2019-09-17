const isObject = require("../utils/isObject")

describe("isObject", () => {
  test("returns TRUE if an object is passed in.", () => {
    expect(isObject({})).toBeTruthy()
  })

  test("returns FALSE if anything other than an object is passed in.", () => {
    expect(isObject("🌮")).toBeFalsy()
  })
})
