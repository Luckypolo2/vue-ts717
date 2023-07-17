import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router/main'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string
  userInfo?: any
  userMenus?: any
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) || '',
    userInfo: localCache.getCache('userInfo') || {},
    userMenus: localCache.getCache('userMenus') || []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      // 本地缓存
      localCache.setCache(LOGIN_TOKEN, loginResult.data.token)
      // 获取登录用户详细信息
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data
      localCache.setCache('userInfo', userInfoResult.data)
      // 获取角色请求用户权限（菜单menus）
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusResult.data
      localCache.setCache('userMenus', userMenusResult.data)
      await router.push('/main')
    }
  }
})
export default useLoginStore
