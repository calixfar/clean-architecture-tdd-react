import { HttpPostClient } from '@/data/protocols'
import faker from 'faker'

export const mockPostRequest = (): HttpPostClient.Params<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})