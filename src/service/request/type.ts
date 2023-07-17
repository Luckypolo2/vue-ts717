import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HYInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (error: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (error: any) => any
}
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYInterceptors<T> // 继承HYInterceptors类型对象
  headers?: any
}
