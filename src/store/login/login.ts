import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router/main'
import { LOGIN_TOKEN } from '@/global/constants'
import type {RouteRecordRaw} from "vue-router";
import {mapMenusToRoutes} from "@/utils/map-menus";

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
      // 动态读取路由
      // const localRoutes: RouteRecordRaw[] = []
      // // 读取路由文件 eager为true立即获取结果
      // const files:Record<string, any> = import.meta.glob('../../router/main/**/*.ts', {eager: true})
      // for (const key in files){
      //   const modules = files[key]
      //   localRoutes.push(modules.default)
      // }
      // for (const menu of this.userMenus) {
      //   for (const submenu of menu.children) {
      //     const route = localRoutes.find((item)=> item.path === submenu.url)
      //     if (route) router.addRoute('main', route)
      //   }
      // }
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach(route=>router.addRoute('main', route))

      await router.push('/main')
    }
  }
})
export default useLoginStore
