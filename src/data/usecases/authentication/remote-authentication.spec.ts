import { HttpPostClientSpy } from "@/data/test"
import { RemoteAuthentication } from "./remote-authentication"

describe('RemoteAuthentication', () => {
  test('should call HttpClient with correct URL', async () => {
    
    const url = 'any_url'
    const httpClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpClientSpy)
    await sut.auth()
    expect(httpClientSpy.url).toBe(url)
  })
  
})
