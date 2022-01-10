

export type HttpResponse = {
  statusCode: HttpResponse.HttpStatusCode
  body?: HttpResponse.Body
}

export namespace HttpResponse {
  export enum HttpStatusCode {
    ok = 200,
    unauthorized = 401,
    badRequest = 400,
    notFound = 404,
    serverError = 500,
    noContent = 204
  }
  export type Body = any
}