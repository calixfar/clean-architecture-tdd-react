export class InvalidCredentialsError extends Error {
  constructor() {
    super('Credentials invalids')
    this.name = 'InvalidCredentialsError'
  }
}