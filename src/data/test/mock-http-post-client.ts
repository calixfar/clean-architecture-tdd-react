import { HttpPostClient } from "@/data/protocols"

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  async post({ url }: HttpPostClient.Params): Promise<void> {
    this.url = url
    return Promise.resolve()
  }
}