import { HttpPostClient } from "@/data/protocols";
import axios from 'axios'

export class AxiosHttpClient {
  async post(params: HttpPostClient.Params<any>): Promise<void> {
    await axios.post(params.url, params.body)
  }
}