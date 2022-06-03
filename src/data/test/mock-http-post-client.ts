import { HttpPostClient, HttpResponse } from '@/data/protocols'

export class HttpPostClientSpy<T, U> implements HttpPostClient<T, U> {
  url?: string
  body: T
  response: HttpResponse<U> = {
    statusCode: HttpResponse.HttpStatusCode.ok
  }

  async post ({ url, body }: HttpPostClient.Params<T>): Promise<HttpResponse<U>> {
    this.url = url
    this.body = body
    return this.response
  }
}