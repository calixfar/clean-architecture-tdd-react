

export type HttpResponse = {
  statusCode: HttpResponse.HttpStatusCode
  body?: HttpResponse.Body
}

export namespace HttpResponse {
  export enum HttpStatusCode {
    unauthorized = 401,
    noContent = 204
  }
  export type Body = any
}