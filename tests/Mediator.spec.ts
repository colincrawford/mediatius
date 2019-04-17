import { IRequestHandler, Mediator } from "../src";
import { getMockRequestHandler, MockRequest, MockResponse } from "./helpers";

describe("Mediator", () => {
  describe("#register", () => {
    it("should allow a RequestHandler to be registered for a Request class", () => {
      const mediator = new Mediator();
      const requestHandler = getMockRequestHandler(new MockResponse());

      mediator.register(MockRequest, requestHandler);
    });
  });

  describe("#send", () => {
    it("should throw an error if there is no registered handler for the request", async () => {
      const mediator = new Mediator();
      const requestHandler = getMockRequestHandler(new MockResponse());

      await expect(mediator.send(new MockRequest())).rejects.toThrowError();
    });

    it("should run the handler for the request class and return a response", async () => {
      const mediator = new Mediator();
      const requestHandler = getMockRequestHandler(new MockResponse());

      mediator.register(MockRequest, requestHandler);

      const response = await mediator.send<MockRequest, MockResponse>(
        new MockRequest()
      );
      expect(response instanceof MockResponse).toBe(true);
    });
  });
});
