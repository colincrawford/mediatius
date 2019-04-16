import { IRequestHandler, Mediator } from "../src";
import { getMockRequestHandler, MockRequest } from "./helpers";

describe("Mediator", () => {
  describe("#register", () => {
    it("should allow a CommandHandler as an input", () => {
      const mediator = new Mediator();
      const commandHandler = getMockRequestHandler(undefined);

      mediator.register(MockRequest, commandHandler);
    });
  });
});
