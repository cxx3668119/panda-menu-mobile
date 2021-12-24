import request from '@/utils/request'
import { IResponseType, IUserInfo } from './interface'

/**
 * 验证用户名是否占用
 * @returns 
 */
 export const checkUsername = (data:any) => {
  return request<any>({
    url: '/user/checkUsername',
    method: 'post',
    data,
    loading: true,
  })
}

/**
 * 验证邮箱是否被占用、并下发验证码
 * @returns 
 */

 export const sendMail = (data:any) => {
  return request<any>({
    url: '/user/sendMail',
    method: 'post',
    data,
    loading: true,
  })
}

/**
 * 登录
 * @returns 
 */

 export const loginU = (data:any) => {
  return request<any>({
    url: '/user/login',
    method: 'post',
    data,
    loading: true,
  })
}


/**
 * 邮箱登录
 * @returns 
 */

 export const loginByMail = (data:any) => {
  return request<any>({
    url: '/user/loginByMail',
    method: 'post',
    data,
    loading: true,
  })
}

/**
 * 注册
 * @returns 
 */

 export const register = (data:any) => {
  return request<any>({
    url: '/user/register',
    method: 'post',
    data,
    loading: true,
  })
}

/**
 * 获取用户信息
 */
export const fetchUserInfo = () => {
  return request<IResponseType<IUserInfo>>({
    url: '/user/info',
    method: 'get',
    loading: true
  })
}

