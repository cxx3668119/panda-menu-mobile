import { IUserInfo } from '@/api/interface'
import { IGlobalState } from '@/store/index'

const getters = {
  userInfo: (state: IGlobalState) => state.auth.userInfo,
  initLink: (state: IGlobalState) => state.link.initLink,
  user:(state:IGlobalState)=>state.user.user,
  token:(state:IGlobalState)=>state.user.token
}
export default getters
