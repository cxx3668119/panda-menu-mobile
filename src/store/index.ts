import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import { IAuthState } from './modules/Auth/interface'
import { ILinkState } from './modules/Link/interface'
import { UserInfoState } from './modules/UserInfo/interface'
import auth from './modules/Auth'
import link from './modules/Link'
import user from './modules/UserInfo'
// 全局状态
export interface IGlobalState {
  auth: IAuthState
  link: ILinkState
  user: UserInfoState
}

const store = createStore<IGlobalState>({
  modules: {
    auth,
    link,
    user
  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer: (state) => ({
        auth: state.auth,
        link: state.link,
        user: state.user
      })
    })
  ]
})

export default store
