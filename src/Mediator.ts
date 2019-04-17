import { IRequest } from "./IRequest";
import { IRequestHandler } from "./IRequestHandler";

type RequestClass<RequestType extends IRequest> = new (
  ...args: any[]
) => RequestType;

/**
 * Implimentation of the mediator pattern. The objective of
 * this behavioral pattern is to decouple communication between
 * objects. This implimentation involves two types of communication
 *
 * 1. Send a request to the mediator and get a response. This
 *    will involve a single handler.
 *
 * 2. Subscribe to [[INotification]]s from the mediator. This may
 *    involve many (or zero) handlers being called.
 */
export default class Mediator {
  private requestHandlers: Map<Function, IRequestHandler<any, any>> = new Map();

  /**
   * Register an [[IRequestHandler]] to be run on a certain message
   * type. Only one handler can be registered for a given message type.
   *
   * @param requestClass - Class for the request
   * @param requestHandler - instance of a [[IRequestHandler]]
   */
  public register<RequestType, ResponseType>(
    requestClass: RequestClass<RequestType>,
    requestHandler: IRequestHandler<RequestType, ResponseType>
  ) {
    this.requestHandlers.set(requestClass, requestHandler);
  }

  /**
   * @param request - The request to send to the mediator
   * @returns that [[IRequestHandler]]s response
   * @throws an error when there is no handler for the [[IRequest]]
   */
  public async send<RequestType extends IRequest, ResponseType>(
    request: RequestType
  ): Promise<ResponseType> {
    const handler = this.getHandler<RequestType, ResponseType>(request);
    if (!handler) {
      this.throwMissingHandlerError();
    }
    return handler!.handle(request);
  }

  private throwMissingHandlerError() {
    throw new Error("No Handler For This Request");
  }

  private getHandler<RequestType, ResponseType>(
    request: RequestType
  ): IRequestHandler<RequestType, ResponseType> | undefined {
    return this.requestHandlers.get(request.constructor);
  }
}
