import { HttpPostClient } from "@/data/protocols"

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body: object
  async post({ url, body }: HttpPostClient.Params): Promise<void> {
    this.url = url
    this.body = body
    return Promise.resolve()
  }
}