/**
 * 用户信息
 */
interface User{
    // age?:number
    // gander?:string
    // headimg?:any
    // id:number
    // mail:string
    // nickname?:string
    // openid?:any
    // password?:string
    // phone:string|number
    // recordtime:string
    // state?:string
    // username:string
}

 export interface UserInfoState {
    token:string|null,
    user:User
  }
  