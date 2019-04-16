import { IRequest, IRequestHandler, Mediator } from "../src";

export function getMockRequestHandler<RequestType, ResponseType>(
  mockResponse: ResponseType
): IRequestHandler<RequestType, ResponseType> {
  return {
    async handle(request: RequestType): Promise<ResponseType> {
      return mockResponse;
    }
  };
}

export class MockRequest {}
