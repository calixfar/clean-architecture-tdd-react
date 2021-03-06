import { HttpPostClient, HttpResponse } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { Authentication } from '@/domain/usecases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpPostClient<Authentication.Params, AccountModel>
  ) {}

  async auth (params: Authentication.Params): Promise<AccountModel> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpResponse.HttpStatusCode.ok:
        return httpResponse.body
      case HttpResponse.HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}