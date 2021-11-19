import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
// import authentication from './authentication'
import appConfig from './config'
import errors from './errors'

export interface HTTPRequest extends AxiosRequestConfig {
  retry?: number
  retries?: number
}

class HTTP {
  //   async authorizedRequest(req: HTTPRequest) {
  //     const token = await authentication.getAccessToken()

  //     if (token) {
  //       req.headers = req.headers ?? {}
  //       req.headers.Authorization = `Bearer ${token}`
  //     }

  //     return await this.request(req)
  //   }

  private async retry(req: HTTPRequest): Promise<AxiosResponse<any>> {
    req.retries = req.retries ?? 1
    return await this.request(req)
  }

  private isNetworkError(e: any) {
    return !!e?.message?.match(/network\serror/i)
  }

  private shouldRetryRequest(e: any, req: HTTPRequest) {
    return (
      (e.response?.status > 501 || this.isNetworkError(e)) &&
      req.retry &&
      (req.retries ?? 0) < req.retry
    )
  }

 

  async request(req: HTTPRequest): Promise<AxiosResponse<any>> {
    if (Object.keys(req).indexOf('baseURL') === -1) {
      req.baseURL = appConfig.baseURL
    }

    if (req.method === 'GET') {
      req.retry = 5
    }

    try {
      return await axios.request(req)
    } catch (e) {
      errors.log(e)

      if (this.shouldRetryRequest(e, req)) {
        //Wait 5s
        await this.wait(5000)
        return await this.retry(req)
      }
      throw e
    }
  }

  //   async blobRequest(req: HTTPRequest) {
  //     req.responseType = 'blob'
  //     return await this.authorizedRequest(req)
  //   }

  private async wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async fake(ms: number) {
    return await this.wait(ms)
  }

  getErrorMessage(e: any) {
    if (e.response?.data?.message) {
      const data = e.response.data
      return data.message
    }

    return e.message
  }
}

export default new HTTP()
