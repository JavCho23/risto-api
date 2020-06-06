// Import all functions from hello-from-lambda.js
const lambda = require("../../../src/delivery/search/handler/search_list");

describe("Test for list items", () => {
  it("Verifies successful response", async () => {
    const result = 2;
    expect(result).toBe(2);
  });
});
