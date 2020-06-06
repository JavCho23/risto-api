// Import all functions from hello-from-lambda.js
const lambda = require("../../../src/delivery/search/handler/search_list");

describe("Test for list items", () => {
  it("Verifies successful response", async () => {
    const result = await lambda.search({
      queryStringParameters: {
        limit: 70,
        offset: 0,
        q: "barreto",
        type: "local",
      },
    });
    expect(result).toHaveProperty("body");
    expect(result).toHaveProperty("headers");
  });
});
