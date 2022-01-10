import { HttpPostClient, HttpResponse } from "@/data/protocols"

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body: object
  response: HttpResponse = {
    statusCode: HttpResponse.HttpStatusCode.noContent
  }
  async post({ url, body }: HttpPostClient.Params): Promise<HttpResponse> {
    this.url = url
    this.body = body
    return Promise.resolve(this.response)
  }
}