import { Module } from 'vuex'
import { IGlobalState } from '@/store/index'
import { UserInfoState } from '@/store/modules/UserInfo/interface'

const state: UserInfoState = {
  token: '',
  user: {
    // age:0,
    // gander:'',
    // headimg:'',
    // id:0,
    // mail:'',
    // nickname:'',
    // openid:'',
    // password:'',
    // phone:'',
    // recordtime:'',
    // state:'',
    // username:'',
  }
}
const user: Module<UserInfoState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    ['SET_INIT_TOKEN'](state, data) {
      state.token = data.satoken
      // state.user = data.user
    },
    ['SET_INIT_USER'](state, data) {
      state.user = data.user
      // state.user = data.user
    }
  },
  actions: {
    async ['SET_INIT_TOKEN']({ commit }, data) {
      return commit('SET_INIT_TOKEN', data)
    },
    async ['SET_INIT_USER']({ commit }, data) {
      return commit('SET_INIT_USER', data)
    }
  }
}

export default user
