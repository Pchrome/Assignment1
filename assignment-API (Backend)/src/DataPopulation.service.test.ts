const request = require("supertest");
const server = require("./server");

describe("Data Population", () => {

  afterAll(() => {
    server.close();
  });
});
