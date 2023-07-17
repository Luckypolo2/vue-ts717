import HYRequestClass from '@/service/request/request'
import { BASE_URL, TIME_OUT } from '@/service/config/config'
import type { HYRequestConfig } from '@/service/request/type'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
const NetRequest = new HYRequestClass({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    responseSuccessFn: (config) => {
      return config
    },
    responseFailureFn: (error) => {
      return error
    },
    // 使用HYRequestConfig类型覆盖 解决类型不匹配问题
    requestSuccessFn: (config: HYRequestConfig) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestFailureFn: (error) => {
      return error
    }
  }
})
export { NetRequest }
