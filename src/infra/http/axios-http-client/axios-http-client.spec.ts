import { AxiosHttpClient } from "./axios-http-client"
import { mockAxios, mockHttpResponse } from "@/infra/test"
import { mockPostRequest } from "@/data/test"
import axios, { AxiosResponse } from "axios"

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct vallues', async () => {
    const { sut, mockedAxios } = makeSut()
    const request = mockPostRequest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpResponse = await sut.post(mockPostRequest())
    const axiosResponse = await mockedAxios.post.mock.results[0].value as AxiosResponse<any, any> 
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  test('should return the correct statusCode and body when it fails', async () => {
    const { sut, mockedAxios } = makeSut()
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    })
    
    const httpResponse = sut.post(mockPostRequest())

    expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value)
  })
})