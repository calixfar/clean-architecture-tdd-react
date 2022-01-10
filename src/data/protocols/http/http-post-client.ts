import { HttpResponse } from "./http-response";

export interface HttpPostClient {
  post(params: HttpPostClient.Params): Promise<HttpResponse>
}

export namespace HttpPostClient {
  export type Params = {
    url: string
    body?: object
  }
}