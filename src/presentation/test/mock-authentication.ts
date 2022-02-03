import { AccountModel } from "@/domain/models"
import { mockAccountModel } from "@/domain/test"
import { Authentication } from "@/domain/usecases"

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: Authentication.Params
  async auth (params: Authentication.Params): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  };
}