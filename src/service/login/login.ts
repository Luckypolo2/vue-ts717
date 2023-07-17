import { NetRequest } from '@/service/service'
import type { IAccount } from '@/types'
export function accountLoginRequest(data: IAccount) {
  return NetRequest.post({
    url: '/login',
    data: data
  })
}
export function getUserInfoById(id: number) {
  return NetRequest.get({
    url: `/users/${id}`
  })
}
export function getUserMenusByRoleId(id: number) {
  return NetRequest.get({
    url: `/role/${id}/menu`
  })
}
