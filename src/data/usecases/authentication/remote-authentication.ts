import { HttpPostClient, HttpResponse } from "@/data/protocols/http"
import { InvalidCredentialsError } from "@/domain/errors"
import { Authentication } from "@/domain/usecases"

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient
    ){}
  async auth(params: Authentication.Params): Promise<void> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params
    })
    switch( httpResponse.statusCode ) {
      case HttpResponse.HttpStatusCode.unauthorized :
        throw new InvalidCredentialsError()
      default:
        return Promise.resolve()
    }
  }
}