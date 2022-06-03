export class UnexpectedError extends Error {
  constructor () {
    super('unknown error happened')
    this.name = 'UnexpectedError'
  }
}