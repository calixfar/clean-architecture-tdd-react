import { HttpPostClient } from "@/data/protocols"
import { Authentication } from "@/domain/usecases"

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient
    ){}
  async auth(params: Authentication.Params): Promise<void> {
    await this.httpClient.post({
      url: this.url,
      body: params
    })
  }
}