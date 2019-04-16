/**
 * Handles a [[Request]] and returns a promise resolving to a response to
 * that command
 */
export interface IRequestHandler<RequestType, ResponseType> {
  handle(request: RequestType): Promise<ResponseType>;
}
