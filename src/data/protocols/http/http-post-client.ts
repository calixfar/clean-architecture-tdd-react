import { HttpResponse } from './http-response'

export interface HttpPostClient<T, U> {
  post(params: HttpPostClient.Params<T>): Promise<HttpResponse<U>>
}

export namespace HttpPostClient {
  export type Params<T> = {
    url: string
    body?: T
  }
}